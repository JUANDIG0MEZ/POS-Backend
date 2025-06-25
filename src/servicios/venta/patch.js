async function modificarVenta (body, idVenta) {
  const transaction = await sequelize.transaction()
  try {
    for (const dataDetalle of body) {
      const detalle = await DetalleVenta.findOne({
        where: {
          venta_id: idVenta,
          producto_id: dataDetalle.producto_id
        },
        transaction,
        lock: transaction.LOCK.UPDATE
      })
      detalle.cantidad = dataDetalle.cantidad
      detalle.precio = dataDetalle.precio
      await detalle.save({ transaction })
    }
    const venta = await Venta.findByPk(idVenta, { transaction })
    const info = {
      pagado: venta.pagado,
      total: venta.total,
      por_pagar: venta.por_pagar,
      estado_id: venta.estado_id
    }

    await transaction.commit()
    console.log(info)
    return {
      info
    }
  } catch (error) {
    await transaction.rollback()
    throw new Error(error)
  }
}

module.exports = {
  modificarVenta
}
