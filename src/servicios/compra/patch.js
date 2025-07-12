const { sequelize, Compra, DetalleCompra, Producto } = require('../../database/models')
const { ErrorUsuario } = require('../../errors/usuario')

async function modificarEstadoEntregaCompra ({ idUsuario, compra_id, id_estado_entrega }) {
  const transaction = await sequelize.transaction()
  try {
    const compra = await Compra.findOne({ where: { id_usuario: idUsuario, compra_id }, transaction })
    if (compra.isAnulada) throw new ErrorUsuario('Esta compra ha sido anulada')
    if (compra.id_estado_entrega === id_estado_entrega) throw new ErrorUsuario('El estado de la compra debe ser diferente')
    const detalles = await DetalleCompra.findAll({ where: { id_compra: compra.id } }, transaction)

    for (const detalle of detalles) {
      const producto = await Producto.findByPk(detalle.id_producto, { transaction, lock: transaction.LOCK.UPDATE })

      if (compra.id_estado_entrega === 1 && id_estado_entrega === 2) producto.cantidad += detalle.cantidad
      else if (compra.id_estado_entrega === 2 && id_estado_entrega === 1) producto.cantidad -= detalle.cantidad
      else throw new Error('id no contemplado en el backend')

      await producto.save({ transaction })
    }
    compra.id_estado_entrega = id_estado_entrega
    await compra.save()
    await transaction.commit()

    return id_estado_entrega
  } catch (error) {
    await transaction.rollback()
    console.log(error)
    throw new Error('Error al cambiar de estado de la compra')
  }
}

module.exports = {
  modificarEstadoEntregaCompra
}
