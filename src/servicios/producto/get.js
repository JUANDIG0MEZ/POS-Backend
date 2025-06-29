const { Producto, ProductoCategoria } = require('../../database/models')
const { OpcionesGet } = require('./opciones/get.js')
const { FormatearCategoria } = require('./formatear')
async function cargarProductos ({ usuarioId }) {
  const productos = await Producto.findAll({
    where: { usuario_id: usuarioId },
    attributes: OpcionesGet.atributos(),
    include: OpcionesGet.incluir(),
    order: [['id', 'DESC']],
    raw: true

  })
  const productosFormateados = OpcionesGet.formatearLista(productos)
  return productosFormateados
}

async function cargarCategorias ({ usuarioId }) {
  const categorias = await ProductoCategoria.findAll({
    where: { usuario_id: usuarioId },
    raw: true
  })

  return FormatearCategoria.formatearLista(categorias)
}

// async function cargarImagenesProducto (id) {
//   const imagenes = await ProductoImagen.findAll({
//     where: { producto_id: id }
//   })
//   return imagenes.map(imagen => imagen.url_imagen)
// }

module.exports = {
  cargarProductos,
  cargarCategorias
  // cargarImagenesProducto
}
