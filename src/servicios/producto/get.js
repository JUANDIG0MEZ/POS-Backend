const { Producto, ProductoCategoria, ProductoMedida } = require('../../database/models')
const { OpcionesGetProducto } = require('./opciones/get.js')
const { FormatearGetCategoria, FormatearGetProducto } = require('./formatear')

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

// async function cargarImagenesProducto (id) {
//   const imagenes = await ProductoImagen.findAll({
//     where: { producto_id: id }
//   })
//   return imagenes.map(imagen => imagen.url_imagen)
// }

module.exports = {
  cargarProductos,
  cargarCategorias,
  cargarMedidas
  // cargarImagenesProducto
}
