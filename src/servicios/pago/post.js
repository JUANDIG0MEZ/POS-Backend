const { Pago } = require('../../database/models')

async function crearPago ({ pago_id, idUsuario, cliente_id, metodo_pago_id, valor, descripcion }, transaction) {
  const fecha = new Date().toISOString().split('T')[0]
  const hora = new Date().toTimeString().split(' ')[0]

  const nuevoPago = {
    pago_id,
    idUsuario,
    cliente_id,
    fecha,
    hora,
    metodo_pago_id,
    descripcion
  }
  await Pago.create(nuevoPago, { transaction })
}

async function crearPagoCompra (body, idFactura) {
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

async function crearPagoCompras (body, idCliente) {
  const transaction = await sequelize.transaction()
  try {
    const valorPago = Number(body.valor)
    const metodoPagoId = Number(body.metodoPagoId)

    const cliente = await Cliente.findByPk(idCliente, { transaction })
    if (valorPago > cliente.por_pagarle) {
      throw Error('El pago es mayor a la deuda')
    }

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
