const { Producto, ProductoCategoria, ProductoMedida } = require('../../database/models')
const { OpcionesGet } = require('./opciones/get.js')
const { FormatearCategoria, FormatearProducto } = require('./formatear')
async function cargarProductos ({ idUsuario }) {
  const productos = await Producto.findAll({
    where: { id_usuario: idUsuario },
    attributes: OpcionesGet.atributos(),
    include: OpcionesGet.incluir(),
    order: [['id', 'DESC']],
    raw: true

  })
  return FormatearProducto.formatearLista(productos)
}

async function cargarCategorias ({ idUsuario }) {
  const categorias = await ProductoCategoria.findAll({
    where: { id_usuario: idUsuario },
    raw: true
  })

  return FormatearCategoria.formatearLista(categorias)
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
