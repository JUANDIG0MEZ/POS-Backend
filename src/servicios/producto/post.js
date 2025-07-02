const { Producto, ProductoCategoria, ProductoMedida, sequelize, Secuencia } = require('../../database/models')
const { OpcionesGet } = require('./opciones/get')
const { ErrorUsuario } = require('../../errors/usuario.js')
const { FormatearCategoria, FormatearProducto } = require('./formatear')
async function crearProducto ({ idUsuario, nombre, categoria_id, id_medida, precio_compra, precio_venta, cantidad }) {
  const transaction = await sequelize.transaction()
  try {
    const secuencia = await Secuencia.findOne({
      where: { id: idUsuario },
      transaction,
      lock: transaction.LOCK.UPDATE
    })

    const categoria = await ProductoCategoria.findOne({ where: { id_usuario: idUsuario, categoria_id } })

    const productoNuevo = {
      id_usuario: idUsuario,
      producto_id: secuencia.producto_id,
      nombre,
      id_categoria: categoria.id,
      id_medida,
      precio_compra,
      precio_venta,
      cantidad,
      total: precio_compra * cantidad
    }

    secuencia.producto_id += 1

    await Producto.create(productoNuevo, { transaction })
    await secuencia.save({ transaction })

    const producto = await Producto.findOne({
      where: { id_usuario: idUsuario, producto_id: productoNuevo.producto_id },
      attributes: OpcionesGet.atributos(),
      include: OpcionesGet.incluir(),
      transaction,
      raw: true
    })

    await transaction.commit()
    console.log('Producto Formateado', FormatearProducto.formatear(producto))
    return {
      producto: FormatearProducto.formatear(producto)
    }
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

async function crearCategoria ({ idUsuario, nombre, descripcion }) {
  const transaction = await sequelize.transaction()
  try {
    const secuencia = await Secuencia.findOne({
      where: { id: idUsuario },
      lock: transaction.LOCK.UPDATE,
      transaction
    })

    const categoriaNueva = {
      id_usuario: idUsuario,
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
