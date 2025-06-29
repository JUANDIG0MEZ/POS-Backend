const { Producto, ProductoCategoria, sequelize, Secuencia } = require('../../database/models')
const { OpcionesGet } = require('./opciones/get')
const { ErrorUsuario } = require('../../errors/usuario.js')
const { FormatearCategoria } = require('./formatear')
async function crearProducto ({ usuarioId, nombre, categoria_id, medida_id, precio_compra, precio_venta, cantidad }) {
  const transaction = await sequelize.transaction()
  try {
    console.log('Usuario Id:', usuarioId)
    const secuencia = await Secuencia.findOne({
      where: { id: usuarioId },
      transaction,
      lock: transaction.LOCK.UPDATE
    })

    const productoNuevo = {
      usuario_id: usuarioId,
      producto_id: secuencia.producto_id,
      nombre,
      categoria_id,
      medida_id,
      precio_compra,
      precio_venta,
      cantidad,
      total: precio_compra * cantidad
    }

    secuencia.producto_id += 1

    await Producto.create(productoNuevo, { transaction })
    await secuencia.save({ transaction })

    const producto = await Producto.findOne({
      where: { producto_id: productoNuevo.producto_id },
      attributes: OpcionesGet.atributos(),
      include: OpcionesGet.incluir(),
      transaction,
      raw: true
    })

    console.log(producto)

    await transaction.commit()

    return {
      producto
    }
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

async function crearCategoria ({ usuarioId, nombre, descripcion }) {
  const transaction = await sequelize.transaction()
  try {
    const secuencia = await Secuencia.findOne({
      where: { id: usuarioId },
      lock: transaction.LOCK.UPDATE,
      transaction
    })

    const categoriaNueva = {
      usuario_id: usuarioId,
      categoria_id: secuencia.categoria_id,
      nombre,
      descripcion
    }
    secuencia.categoria_id += 1

    const categoria = await ProductoCategoria.create(categoriaNueva, { transaction })
    await secuencia.save({ transaction })
    await transaction.commit()

    const categoriaFormateada = FormatearCategoria.formatear(categoria.get({ plain: true }))
    return {
      categoria: categoriaFormateada
    }
  } catch (error) {
    await transaction.rollback()
    console.error('Error al crear la categoria:', error)
    throw new ErrorUsuario('Error al crear la categoria')
  }
}

module.exports = {
  crearProducto,
  crearCategoria
}
