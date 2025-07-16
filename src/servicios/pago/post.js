const { Pago, Secuencia, sequelize, Compra, Cliente } = require('../../database/models')
const { crearDescripcionPagoCompra } = require('./utils')
const { Op } = require('sequelize')
const Decimal = require('decimal.js')
const { generarFecha, generarHora } = require('../../utils/fechas')

async function crearPago ({ idUsuario, id_cliente, id_metodo_pago, valor, descripcion }, transaction) {
  const secuencia = await Secuencia.findByPk(idUsuario)

  const nuevoPago = {
    id_usuario: idUsuario,
    pago_id: secuencia.pago_id,
    id_cliente,
    id_metodo_pago,
    descripcion,
    fecha: generarFecha(),
    hora: generarHora(),
    valor
  }

  await secuencia.increment('pago_id', { by: 1, transaction })
  await Pago.create(nuevoPago, { transaction })
}

async function crearPagoCompra ({ idUsuario, compra_id }, { id_metodo_pago, valor, descripcion }) {
  const transaction = await sequelize.transaction()
  try {
    const compra = await Compra.findOne({ where: { id_usuario: idUsuario, compra_id }, transaction, lock: transaction.LOCK.UPDATE })
    const cliente = await Cliente.findByPk(compra.id_cliente, { transaction, lock: transaction.LOCK.UPDATE })

    const valorDecimal = new Decimal(valor)
    if (compra.id_estado_factura === 2) throw new Error('No se pueden hacer abonos a facturas anuladas')
    if (valorDecimal.gt(compra.por_pagar)) throw Error('El pago es mayor a la deuda')

    const descripcionCompleta = crearDescripcionPagoCompra({ compra_id, valor: valorDecimal.toString(), id_metodo_pago, descripcion })
    await crearPago({ idUsuario, id_cliente: compra.id_cliente, id_metodo_pago, valor, descripcion: descripcionCompleta }, transaction)

    compra.pagado = valorDecimal.plus(compra.pagado).toString()
    await cliente.increment('por_pagarle', { by: valorDecimal.negated().toString(), transaction })
    await compra.save({ transaction })
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
    const cliente = await Cliente.findOne({ where: { id_usuario: idUsuario, cliente_id }, transaction, lock: transaction.LOCK.UPDATE })

    const valorDecimal = new Decimal(valor)

    if (valorDecimal.gt(cliente.por_pagarle)) throw Error('El pago es mayor a la deuda')

    const compras = await Compra.findAll({
      where: { id_usuario: idUsuario, id_estado_pago: 1, id_cliente: cliente.id, id_estado_factura: { [Op.ne]: 2 } },
      attributes: ['id', 'total', 'pagado', 'por_pagar', 'id_cliente'],
      order: [['id', 'ASC']],
      transaction,
      lock: transaction.LOCK.UPDATE
    })

    let valorRestanteDecimal = valorDecimal

    for (const compra of compras) {
      const porPagarDecimal = new Decimal(compra.por_pagar)

      if (valorRestanteDecimal.lte(porPagarDecimal)) {
        await compra.increment('pagado', { by: valorRestanteDecimal.toString(), transaction })
        valorRestanteDecimal = new Decimal(0)
        break
      } else {
        await compra.increment('pagado', { by: porPagarDecimal.toString(), transaction })
        valorRestanteDecimal = valorRestanteDecimal.minus(porPagarDecimal)
      }
    }

    // Pagale al saldo favor
    if (valorRestanteDecimal.gt(0)) {
      const saldoFavorDecimal = new Decimal(cliente.por_pagarle)
      const nuevoSaldoFavorDecimal = saldoFavorDecimal.minus(valorRestanteDecimal)
      if (nuevoSaldoFavorDecimal.lt(0)) throw new Error('El saldo a favor del cliente no puede ser menor a 0')
      await cliente.update({ por_pagarle: nuevoSaldoFavorDecimal.toString() })
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
