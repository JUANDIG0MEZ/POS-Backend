const { Pago, Secuencia, sequelize, Compra, Cliente } = require('../../database/models')
const { crearDescripcionPagoCompra } = require('./utils')
const { Op } = require('sequelize')
const Decimal = require('decimal.js')

async function crearPago ({ idUsuario, id_cliente, id_metodo_pago, valor, descripcion }, transaction) {
  const fecha = new Date().toISOString().split('T')[0]
  const hora = new Date().toTimeString().split(' ')[0]

  const secuencia = await Secuencia.findByPk(idUsuario)

  const nuevoPago = {
    id_usuario: idUsuario,
    pago_id: secuencia.pago_id,
    id_cliente,
    id_metodo_pago,
    descripcion,
    fecha,
    hora,
    valor
  }

  await secuencia.increment('pago_id', { by: 1, transaction })
  await Pago.create(nuevoPago, { transaction })
}

async function crearPagoCompra ({ idUsuario, compra_id }, { id_metodo_pago, valor, descripcion }) {
  const transaction = await sequelize.transaction()
  try {
    const compra = await Compra.findOne({
      where: { id_usuario: idUsuario, compra_id },
      transaction,
      lock: transaction.LOCK.UPDATE
    })

    const valorDecimal = new Decimal(valor)

    if (compra.id_estado_factura === 1) throw new Error('no se pueden hacer abonos a facturas anuladas')
    if (valorDecimal.gt(compra.por_pagar)) throw Error('El pago es mayor a la deuda')

    await compra.increment('pagado', { by: valorDecimal.toString(), transaction })

    //
    const descripcionCompleta = crearDescripcionPagoCompra({ compra_id, valor: valorDecimal.toString(), id_metodo_pago, descripcion })
    await crearPago({ idUsuario, id_cliente: compra.id_cliente, id_metodo_pago, valor, descripcion: descripcionCompleta }, transaction)

    //
    await transaction.commit()
    return {
      pagado: compra.pagado
    }
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

async function crearPagoCliente ({ idUsuario, cliente_id }, { id_metodo_pago, valor, descripcion }) {
  const transaction = await sequelize.transaction()
  try {
    const cliente = await Cliente.findOne({
      where: { id_usuario: idUsuario, cliente_id },
      transaction
    })
    if (valor > Number(cliente.por_pagarle)) throw Error('El pago es mayor a la deuda')

    const compras = await Compra.findAll({
      where: { id_usuario: idUsuario, id_estado_pago: 1, id_cliente: cliente.id, id_estado_factura: { [Op.ne]: 2 } },
      attributes: ['id', 'total', 'pagado', 'por_pagar', 'id_cliente'],
      order: [['id', 'ASC']],
      transaction,
      lock: transaction.LOCK.UPDATE
    })

    let valorRestante = valor

    for (const compra of compras) {
      const porPagar = compra.por_pagar

      if (valorRestante <= porPagar) {
        compra.pagado = Number(compra.pagado) + valorRestante
        valorRestante = 0
        await compra.save({ transaction })
        break
      } else {
        valorRestante = valorRestante - porPagar
        compra.pagado = compra.total
        await compra.save({ transaction })
      }
    }

    if (valorRestante > 0) {
      cliente.por_pagarle = cliente.por_pagarle - valorRestante
      if (Number(cliente.por_pagale) < 0) throw new Error('El saldo a favor del cliente no puede menor a 0')
      await cliente.save({ transaction })
    }

    await cliente.reload({ transaction })

    await crearPago({ idUsuario, id_cliente: cliente.id, id_metodo_pago, valor, descripcion }, transaction)

    await transaction.commit()
    return {
      por_pagarle: cliente.por_pagarle
    }
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

module.exports = {
  crearPago,
  crearPagoCompra,
  crearPagoCliente
}
