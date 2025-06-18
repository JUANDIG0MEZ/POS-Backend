const {
  sequelize,
  Cliente,
  Pago,
  Abono,
  Compra,
  Venta
} = require('../../database/models')

async function crearPago (infoPago, transaction) {
  const fecha = new Date().toISOString().split('T')[0]
  const hora = new Date().toTimeString().split(' ')[0]

  infoPago.fecha = fecha
  infoPago.hora = hora

  await Pago.create(infoPago, { transaction })
}

async function crearAbono (infoAbono, transaction) {
  const fecha = new Date().toISOString().split('T')[0]
  const hora = new Date().toTimeString().split(' ')[0]

  infoAbono.fecha = fecha
  infoAbono.hora = hora
  await Abono.create(infoAbono, { transaction })
}

async function crearPagoFactura (body, idFactura) {
  const transaction = await sequelize.transaction()
  try {
    const valor = Number(body.valor)
    const metodoPagoId = Number(body.metodoPagoId)

    const compra = await Compra.findByPk(idFactura, {
      transaction,
      lock: transaction.LOCK.UPDATE
    })
    const porPagar = Number(compra.por_pagar)

    if (valor > porPagar) {
      throw Error('El pago es mayor a la deuda')
    }

    compra.pagado = compra.pagado + valor
    await compra.save({ transaction })

    const infoPago = {
      valor,
      metodo_pago_id: metodoPagoId,
      cliente_id: compra.cliente_id,
      descripcion: body.descripcion
    }

    await crearPago(infoPago, transaction)

    await transaction.commit()
    return {
      pagado: compra.pagado
    }
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

async function crearAbonoFactura (body, idFactura) {
  const transaction = await sequelize.transaction()
  try {
    const valorAbono = Number(body.valor)
    const metodoPagoId = Number(body.metodoPagoId)

    const venta = await Venta.findByPk(idFactura, {
      transaction,
      lock: transaction.LOCK.UPDATE
    })

    const porPagar = Number(venta.por_pagar)
    if (valorAbono > porPagar) {
      throw Error('El abono es mayor a la deuda')
    }
    venta.pagado = venta.pagado + valorAbono

    await venta.save({ transaction })

    const infoAbono = {
      valor: valorAbono,
      metodo_pago_id: metodoPagoId,
      cliente_id: venta.cliente_id,
      descripcion: body.descripcion
    }

    await crearAbono(infoAbono, transaction)
    await transaction.commit()

    return {
      pagado: venta.pagado
    }
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

async function crearPagosFacturas (body, idCliente) {
  const transaction = await sequelize.transaction()
  try {
    const valorPago = Number(body.valor)
    const metodoPagoId = Number(body.metodoPagoId)

    const cliente = await Cliente.findByPk(idCliente, { transaction })
    if (valorPago > cliente.por_pagarle) {
      throw Error('El pago es mayor a la deuda')
    }

    console.log('creando pago', body)
    const compras = await Compra.findAll({
      where: {
        estado_pago_id: 1,
        cliente_id: idCliente
      },
      attributes: ['id', 'total', 'pagado', 'por_pagar', 'cliente_id'],
      order: [['id', 'ASC']],
      transaction,
      lock: transaction.LOCK.UPDATE
    })

    let valorRestante = valorPago
    for (const compra of compras) {
      const porPagar = compra.por_pagar

      if (valorRestante <= porPagar) {
        compra.pagado = compra.pagado + valorRestante
        await compra.save({ transaction })
        break
      } else {
        valorRestante = valorRestante - porPagar
        compra.pagado = compra.total
        await compra.save({ transaction })
      }
    }

    await cliente.reload({ transaction })

    const infoPago = {
      valor: valorPago,
      metodo_pago_id: metodoPagoId,
      cliente_id: idCliente,
      descripcion: body.descripcion
    }

    await crearPago(infoPago, transaction)

    await transaction.commit()
    return {
      por_pagarle: cliente.por_pagarle
    }
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

async function crearAbonosFacturas (body, idCliente) {
  const transaction = await sequelize.transaction()
  try {
    const valorAbono = Number(body.valor)
    const metodoPagoId = Number(body.metodoPagoId)
    const cliente = await Cliente.findByPk(idCliente, { transaction })

    if (valorAbono > Number(cliente.debe)) {
      throw Error('El abono es mayor a la deuda')
    }

    const ventas = await Venta.findAll({
      where: {
        estado_pago_id: 1,
        cliente_id: idCliente
      },
      attributes: ['id', 'total', 'pagado', 'por_pagar', 'cliente_id'],
      order: [['id', 'ASC']],
      transaction,
      lock: transaction.LOCK.UPDATE
    })

    let valorRestante = valorAbono

    for (const venta of ventas) {
      const porPagar = venta.por_pagar

      if (valorRestante <= porPagar) {
        venta.pagado = venta.pagado + valorRestante
        await venta.save({ transaction })
        break
      } else {
        valorRestante = valorRestante - porPagar
        venta.pagado = venta.total
        await venta.save({ transaction })
      }
    }

    await cliente.reload({ transaction })

    const infoAbono = {
      valor: valorAbono,
      metodo_pago_id: metodoPagoId,
      cliente_id: idCliente,
      descripcion: body.descripcion
    }

    await crearAbono(infoAbono, transaction)

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
  crearPagoFactura,
  crearPagosFacturas,
  crearAbonoFactura,
  crearAbonosFacturas
}
