const { sequelize, Venta, DetalleVenta, Producto } = require('../../database/models')

async function modificarDetalleVenta ({ idUsuario, venta_id, detalles }) {
  const transaction = await sequelize.transaction()
  try {
    const venta = await Venta.findOne({ where: { id_usuario: idUsuario, venta_id } })
    for (const dataDetalle of detalles) {
      const producto = await Producto.findOne({ where: { id_usuario: idUsuario, producto_id: dataDetalle.producto_id } })
      const detalle = await DetalleVenta.findOne({
        where: {
          id_venta: venta.id,
          id_producto: producto.id
        },
        transaction,
        lock: transaction.LOCK.UPDATE
      })
      detalle.cantidad = dataDetalle.cantidad
      detalle.precio = dataDetalle.precio
      console.log('Modificando detalle')
      await detalle.save({ transaction })
      console.log('Detalle modificado')
    }
    await venta.reload({ transaction })
    const info = {
      pagado: venta.pagado,
      total: venta.total,
      por_pagar: venta.por_pagar,
      estado_id: venta.estado_id
    }

    await transaction.commit()
    return {
      info
    }
  } catch (error) {
    await transaction.rollback()
    throw new Error(error)
  }
}

module.exports = {
  modificarDetalleVenta
}
