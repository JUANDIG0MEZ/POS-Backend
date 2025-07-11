const { Producto, sequelize, ProductoCategoria } = require('../../database/models')
const { OpcionesGetProducto } = require('./opciones/get')
const { ErrorUsuario } = require('../../errors/usuario')

async function modificarProducto ({ idUsuario, producto_id, body }) {
  console.log(body)
  const transaction = await sequelize.transaction()
  try {
    const {
      categoria_id,
      precio_compra,
      precio_venta
    } = body

    const actualizar = {
      precio_compra,
      precio_venta
    }
    if (categoria_id) {
      const categoria = await ProductoCategoria.findOne({
        where: {
          id_usuario: idUsuario,
          categoria_id
        }
      })

      actualizar.id_categoria = categoria.id
    }

    // where : {id_usuario: idUsuario, producto_id}
    await Producto.update(actualizar,
      { where: { id_usuario: idUsuario, producto_id }, transaction }
    )

    const producto = await Producto.findOne({
      where: { producto_id, id_usuario: idUsuario },
      attributes: OpcionesGetProducto.atributos(),
      include: OpcionesGetProducto.incluir(),
      transaction
    })

    await transaction.commit()

    return producto
  } catch (error) {
    console.log(error)
    await transaction.rollback()
    throw new ErrorUsuario('Error al actualizar el producto')
  }
}

module.exports = {
  modificarProducto
}
