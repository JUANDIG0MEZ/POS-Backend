const { sequelize, Compra, DetalleCompra, Producto } = require('../../database/models')

async function modificarCompra ({ idUsuario, detalles, compra_id }) {
  const transaction = await sequelize.transaction()

  console.log('detalles', detalles)
  try {
    const compra = await Compra.findOne({ where: { id_usuario: idUsuario, compra_id } })
    for (const dataDetalle of detalles) {
      const producto = await Producto.findOne({ where: { id_usuario: idUsuario, producto_id: dataDetalle.producto_id } })
      const detalle = await DetalleCompra.findOne({
        where: {
          id_compra: compra.id,
          id_producto: producto.id
        },
        transaction,
        lock: transaction.LOCK.UPDATE
      })
      detalle.cantidad = dataDetalle.cantidad
      detalle.precio = dataDetalle.precio
      await detalle.save({ transaction })
    }

    await compra.reload({ transaction })
    const info = {
      pagado: compra.pagado,
      total: compra.total,
      por_pagar: compra.por_pagar,
      estado_id: compra.estado_id
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
  modificarCompra
}
