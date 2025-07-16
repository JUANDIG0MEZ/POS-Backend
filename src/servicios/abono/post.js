const { Op } = require('sequelize')
const { Abono, Secuencia, Venta, sequelize, Cliente } = require('../../database/models')
const { ErrorUsuario } = require('../../errors/usuario')
const Decimal = require('decimal.js')
const { crearDescripcionAbonoVenta, crearDescripcionAbonoCliente } = require('./utils')
const { generarFecha, generarHora } = require('../../utils/fechas')
async function crearAbono ({ idUsuario, id_cliente, id_metodo_pago, valor, descripcion }, transaction) {
  const secuencia = await Secuencia.findByPk(idUsuario)

  const nuevoAbono = {
    id_usuario: idUsuario,
    abono_id: secuencia.abono_id,
    id_cliente,
    id_metodo_pago,
    valor,
    descripcion,
    fecha: generarFecha(),
    hora: generarHora()
  }

  await secuencia.increment('abono_id', { by: 1, transaction })
  await Abono.create(nuevoAbono, { transaction })
}

async function crearAbonoVenta ({ idUsuario, venta_id }, { id_metodo_pago, valor, descripcion }) {
  const transaction = await sequelize.transaction()
  try {
    const venta = await Venta.findOne({ where: { id_usuario: idUsuario, venta_id }, transaction, lock: transaction.LOCK.UPDATE })
    const cliente = await Cliente.findByPk(venta.id_cliente, { transaction, lock: transaction.LOCK.UPDATE })

    const valorDecimal = new Decimal(valor)
    if (venta.id_estado_factura === 2) throw new ErrorUsuario('No se puede realizar abonos a facturas anuladas')
    if (valorDecimal.gt(venta.por_pagar)) throw Error('El abono es mayor a la deuda')

    const descripcionCompleta = crearDescripcionAbonoVenta({ venta_id, valor: valorDecimal.toString(), id_metodo_pago, descripcion })
    await crearAbono({ idUsuario, id_cliente: venta.id_cliente, id_metodo_pago, valor, descripcion: descripcionCompleta }, transaction)

    venta.pagado = valorDecimal.plus(venta.pagado).toString()
    await venta.save({ transaction })
    await cliente.decrement('debe', { by: valorDecimal.toString(), transaction })

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
    const cliente = await Cliente.findOne({ where: { id_usuario: idUsuario, cliente_id }, transaction, lock: transaction.LOCK.UPDATE })

    const valorDecimal = new Decimal(valor)
    if (valorDecimal.gt(cliente.debe)) throw ErrorUsuario('El abono es mayor a la deuda')

    const ventas = await Venta.findAll({
      where: { id_usuario: idUsuario, id_estado_pago: 1, id_cliente: cliente.id, id_estado_factura: { [Op.ne]: 2 } },
      attributes: ['id', 'total', 'pagado', 'por_pagar', 'id_cliente'],
      order: [['id', 'ASC']],
      transaction,
      lock: transaction.LOCK.UPDATE
    })

    let valorRestanteDecimal = valorDecimal
    for (const venta of ventas) {
      const porPagarDecimal = new Decimal(venta.por_pagar)

      if (valorRestanteDecimal.lte(porPagarDecimal)) {
        venta.pagado = valorRestanteDecimal.plus(venta.pagado).toString()
        valorRestanteDecimal = new Decimal(0)
        await venta.save({ transaction })
        break
      } else {
        venta.pagado = porPagarDecimal.plus(venta.pagado).toString()
        valorRestanteDecimal = valorRestanteDecimal.minus(porPagarDecimal)
        await venta.save({ transaction })
      }
    }

    const debeDecimal = new Decimal(cliente.debe)
    const nuevoDebeDecimal = debeDecimal.minus(valorDecimal)
    await cliente.update({ debe: nuevoDebeDecimal.toString() }, { transaction })

    const descripcionCompleta = crearDescripcionAbonoCliente({ valor, id_metodo_pago, descripcion })
    await crearAbono({ idUsuario, id_cliente: cliente.id, id_metodo_pago, valor, descripcion: descripcionCompleta }, transaction)

    await cliente.reload({ transaction })
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
