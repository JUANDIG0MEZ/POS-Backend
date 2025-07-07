const { Pago, Secuencia, sequelize, Compra, Cliente } = require('../../database/models')
const { ErrorUsuario } = require('../../errors/usuario')

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

  secuencia.pago_id += 1
  await secuencia.save({ transaction })

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
    const porPagar = Number(compra.por_pagar)

    if (valor > porPagar) throw Error('El pago es mayor a la deuda')
    compra.pagado = compra.pagado + valor
    await compra.save({ transaction })

    let descripcionCompleta = `Pago a factura de compra #${compra_id}`
    if (descripcion) descripcionCompleta += ', Info: ' + descripcion

    await crearPago({ idUsuario, id_cliente: compra.id_cliente, id_metodo_pago, valor, descripcion: descripcionCompleta }, transaction)

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
    if (valor > cliente.por_pagarle) throw Error('El pago es mayor a la deuda')

    const compras = await Compra.findAll({
      where: { id_usuario: idUsuario, id_estado_pago: 1, id_cliente: cliente.id },
      attributes: ['id', 'total', 'pagado', 'por_pagar'],
      order: [['id', 'ASC']],
      transaction,
      lock: transaction.LOCK.UPDATE
    })

    let valorRestante = valor
    for (const compra of compras) {
      const porPagar = compra.por_pagar

      if (valorRestante <= porPagar) {
        compra.pagado = compra.pagado + valorRestante
        valorRestante = 0
        await compra.save({ transaction })
        break
      } else {
        valorRestante = valorRestante - porPagar
        compra.pagado = compra.total
        await compra.save({ transaction })
      }
    }

    if (valorRestante > 0) throw new ErrorUsuario('Ocurrio algun error al pagar las facturas de compra')

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
