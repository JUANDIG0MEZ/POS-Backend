const { sequelize, Venta, DetalleVenta, Producto } = require('../../database/models')
const { ErrorUsuario } = require('../../errors/usuario.js')

async function modificarEstadoEntregaVenta ({ idUsuario, venta_id, id_estado_entrega }) {
  const transaction = await sequelize.transaction()
  try {
    const venta = await Venta.findOne({ where: { id_usuario: idUsuario, venta_id }, transaction })

    if (venta.id_estado_factura === 2) throw new ErrorUsuario('Esta venta ha sido anulada')
    if (venta.id_estado_entrega === id_estado_entrega) throw new ErrorUsuario('El estado de la venta debe ser diferente')

    const detalles = await DetalleVenta.findAll({ where: { id_venta: venta.id } }, transaction)

    for (const detalle of detalles) {
      const producto = await Producto.findByPk(detalle.id_producto, { transaction, lock: transaction.LOCK.UPDATE })

      if (venta.id_estado_entrega === 1 && id_estado_entrega === 2) producto.cantidad += detalle.cantidad
      else if (venta.id_estado_entrega === 2 && id_estado_entrega === 1) producto.cantidad -= detalle.catnidad
      else throw new Error('id no contemplado en el backend')

      await producto.save({ transaction })
    }
    venta.id_estado_entrega = id_estado_entrega
    await venta.save()
    await transaction.commit()

    return id_estado_entrega
  } catch (error) {
    await transaction.rollback()
    throw new Error('Error al cambiar el estado de la entrega')
  }
}

module.exports = {
  modificarEstadoEntregaVenta
}
