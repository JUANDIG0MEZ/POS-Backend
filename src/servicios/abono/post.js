const { Op } = require('sequelize')
const { Abono, Secuencia, Venta, sequelize, Cliente } = require('../../database/models')
const { ErrorUsuario } = require('../../errors/usuario')

async function crearAbono ({ idUsuario, id_cliente, id_metodo_pago, valor, descripcion }, transaction) {
  const fecha = new Date().toISOString().split('T')[0]
  const hora = new Date().toTimeString().split(' ')[0]

  const secuencia = await Secuencia.findByPk(idUsuario)

  const nuevoAbono = {
    id_usuario: idUsuario,
    abono_id: secuencia.abono_id,
    id_cliente,
    id_metodo_pago,
    valor,
    descripcion,
    fecha,
    hora
  }

  secuencia.abono_id += 1
  await secuencia.save({ transaction })

  await Abono.create(nuevoAbono, { transaction })
}

async function crearAbonoVenta ({ idUsuario, venta_id }, { id_metodo_pago, valor, descripcion }) {
  const transaction = await sequelize.transaction()
  try {
    const venta = await Venta.findOne({
      where: { id_usuario: idUsuario, venta_id },
      transaction,
      lock: transaction.LOCK.UPDATE
    })

    if (venta.id_estado_factura === 1) throw new ErrorUsuario('No se puede realizar abonos a facturas anuladas')
    if (valor > venta.por_pagar) throw Error('El abono es mayor a la deuda')

    //
    venta.pagado = venta.pagado + valor
    await venta.save({ transaction })

    //
    let descripcionCompleta = `Abono a factura de venta # ${venta_id}`
    if (descripcion) descripcionCompleta += ', Info: ' + descripcion
    await crearAbono({ idUsuario, id_cliente: venta.id_cliente, id_metodo_pago, valor, descripcion: descripcionCompleta }, transaction)

    await transaction.commit()
    return {
      pagado: venta.pagado
    }
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

async function crearAbonoCliente ({ idUsuario, cliente_id }, { id_metodo_pago, valor, descripcion }) {
  const transaction = await sequelize.transaction()
  try {
    const cliente = await Cliente.findOne({
      where: { id_usuario: idUsuario, cliente_id },
      transaction
    })

    if (valor > cliente.debe) throw ErrorUsuario('El abono es mayor a la deuda')

    const ventas = await Venta.findAll({
      where: { id_usuario: idUsuario, id_estado_pago: 1, id_cliente: cliente.id, id_estado_factura: { [Op.ne]: 2 } },
      attributes: ['id', 'total', 'pagado', 'por_pagar', 'id_cliente'],
      order: [['id', 'ASC']],
      transaction,
      lock: transaction.LOCK.UPDATE
    })

    let valorRestante = valor

    for (const venta of ventas) {
      const porPagar = venta.por_pagar

      if (valorRestante <= porPagar) {
        venta.pagado = venta.pagado + valorRestante
        valorRestante = 0
        await venta.save({ transaction })
        break
      } else {
        valorRestante = valorRestante - porPagar
        venta.pagado = venta.total
        await venta.save({ transaction })
      }
    }

    if (valorRestante > 0) {
      cliente.debe = cliente.debe - valorRestante
      if (cliente.debe < 0) throw new Error('Ocurrio algun error')
      await cliente.save({ transaction })
    }

    await cliente.reload({ transaction })

    await crearAbono({ idUsuario, id_cliente: cliente.id, id_metodo_pago, valor, descripcion }, transaction)

    await transaction.commit()
    return {
      debe: cliente.debe
    }
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

module.exports = {
  crearAbono,
  crearAbonoVenta,
  crearAbonoCliente
}
