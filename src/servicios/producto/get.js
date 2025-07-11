const { Producto, ProductoCategoria, ProductoMedida, AjusteInventario, DetalleAjuste } = require('../../database/models')
const { OpcionesGetProducto, OpcionesGetAjustesInventario, OpcionesGetProductoAjustesInventario } = require('./opciones/get.js')
const { FormatearGetCategoria, FormatearGetProducto } = require('./formatear')
const { FormatearAjustesInventario } = require('./formatear/get.js')
const { cantidad } = require('../../schemas/propiedades.js')

async function cargarProductos ({ idUsuario }) {
  const productos = await Producto.findAll({
    where: { id_usuario: idUsuario },
    attributes: OpcionesGetProducto.atributos(),
    include: OpcionesGetProducto.incluir(),
    order: [['id', 'DESC']],
    raw: true

  })
  return FormatearGetProducto.formatearLista(productos)
}

async function cargarCategorias ({ idUsuario }) {
  const categorias = await ProductoCategoria.findAll({
    where: { id_usuario: idUsuario },
    raw: true
  })

  return FormatearGetCategoria.formatearLista(categorias)
}

async function cargarMedidas () {
  const medidas = await ProductoMedida.findAll({ raw: true })
  return medidas
}

async function cargarAjustesInventario ({ idUsuario }, { offset, limit }) {
  const { count, rows } = await AjusteInventario.findAndCountAll({
    where: { id_usuario: idUsuario },
    attributes: OpcionesGetAjustesInventario.atributos(),
    limit,
    offset
  })
  return { count, rows: FormatearAjustesInventario.formatearLista(rows) }
}

async function cargarAjusteInventario ({ idUsuario, ajuste_id }) {
  const ajuste = await AjusteInventario.findOne({
    where: { id_usuario: idUsuario, ajuste_id }
  })
  const detallesAjuste = await DetalleAjuste.findAll({
    where: { id_ajuste: ajuste.id }
  })

  const detallesAntes = []
  const detallesAhora = []

  for (const detalle of detallesAjuste) {
    const {
      id_producto,
      cantidad_antes,
      cantidad_ahora
    } = detalle
    const producto = await Producto.findOne({
      where: { id: id_producto },
      attributes: OpcionesGetProductoAjustesInventario.atributos(),
      include: OpcionesGetProductoAjustesInventario.incluir(),
      raw: true
    })

    detallesAntes.push({ ...producto, cantidad: cantidad_antes })
    detallesAhora.push({ ...producto, cantidad: cantidad_ahora })
  }

  return { ajuste, detallesAntes, detallesAhora }
}

// async function cargarImagenesProducto (id) {
//   const imagenes = await ProductoImagen.findAll({
//     where: { producto_id: id }
//   })
//   return imagenes.map(imagen => imagen.url_imagen)
// }

module.exports = {
  cargarProductos,
  cargarCategorias,
  cargarMedidas,
  cargarAjusteInventario,
  cargarAjustesInventario
  // cargarImagenesProducto
}
