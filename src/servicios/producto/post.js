const { Producto, ProductoCategoria, sequelize, Secuencia, AjusteInventario, DetalleAjuste } = require('../../database/models')
const { OpcionesGetProducto } = require('./opciones/get')
const { ErrorUsuario } = require('../../errors/usuario.js')
const { FormatearGetCategoria, FormatearGetProducto } = require('./formatear')

async function crearProducto ({ idUsuario, nombre, categoria_id, id_medida, precio_compra, precio_venta, cantidad }) {
  const transaction = await sequelize.transaction()
  try {
    const secuencia = await Secuencia.findOne({
      where: { id: idUsuario },
      transaction,
      lock: transaction.LOCK.UPDATE
    })

    const productoNuevo = {
      id_usuario: idUsuario,
      producto_id: secuencia.producto_id,
      nombre,
      id_medida,
      precio_compra,
      precio_venta,
      cantidad,
      total: precio_compra * cantidad
    }

    if (categoria_id) {
      const categoria = await ProductoCategoria.findOne({ where: { id_usuario: idUsuario, categoria_id } })
      productoNuevo.id_categoria = categoria.id
    }

    secuencia.producto_id += 1

    await Producto.create(productoNuevo, { transaction })
    await secuencia.save({ transaction })

    const producto = await Producto.findOne({
      where: { id_usuario: idUsuario, producto_id: productoNuevo.producto_id },
      attributes: OpcionesGetProducto.atributos(),
      include: OpcionesGetProducto.incluir(),
      transaction,
      raw: true
    })

    await transaction.commit()
    return {
      producto: FormatearGetProducto.formatear(producto)
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

    const categoriaFormateada = FormatearGetCategoria.formatear(categoria.get({ plain: true }))
    return {
      categoria: categoriaFormateada
    }
  } catch (error) {
    await transaction.rollback()
    console.error('Error al crear la categoria:', error)
    throw new ErrorUsuario('Error al crear la categoria')
  }
}

async function crearAjusteInventario ({ idUsuario, detalles }) {
  const transaction = await sequelize.transaction()
  try {
    const secuencia = await Secuencia.findOne({ where: { id: idUsuario }, transaction, lock: transaction.LOCK.UPDATE })

    // Variables necesarias
    const fechaActual = new Date()
    const fechaFormato = fechaActual.toISOString().split('T')[0]
    const horaFormato = fechaActual.toTimeString().split(' ')[0]

    const ajusteInventario = await AjusteInventario.create({
      id_usuario: idUsuario,
      ajuste_id: secuencia.ajuste_id,
      fecha: fechaFormato,
      hora: horaFormato
    },
    transaction)

    for (const detalle of detalles) {
      const {
        producto_id,
        cantidad
      } = detalle
      const producto = await Producto.findOne({
        where: { id_usuario: idUsuario, producto_id },
        transaction,
        lock: transaction.LOCK.UPDATE
      })
      const cantidadAntes = producto.cantidad
      producto.cantidad = cantidad

      const nuevoDetalleAjuste = {
        id_ajuste: ajusteInventario.id,
        id_producto: producto.id,
        cantidad_antes: cantidadAntes,
        cantidad_ahora: cantidad

      }
      await DetalleAjuste.create(nuevoDetalleAjuste, { transaction })
      await producto.save({ transaction })
    }

    secuencia.ajuste_id += 1
    await secuencia.save({ transaction })
    await transaction.commit()
    return ajusteInventario
  } catch (error) {
    await transaction.rollback()
    throw new Error(error)
  }
}

module.exports = {
  crearProducto,
  crearCategoria,
  crearAjusteInventario
}
