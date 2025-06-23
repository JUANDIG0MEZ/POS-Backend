const {
  Producto,
  ProductoImagen
} = require('../../database/models')

const {
  ClaseProducto
} = require('./clase')

async function cargarProductos () {
  const permisos = { precio_compra: true, cantidad: true, total: true }

  const productos = await Producto.findAll({
    attributes: { exclude: ['categoria_id', 'medida_id'] },
    include: ClaseProducto.incluir(),
    exclude: ClaseProducto.excluir(),
    order: [['id', 'DESC']]

  })

  const productosFormateados = ClaseProducto.formatear(productos, permisos)

  return productosFormateados
}

async function cargarImagenesProducto (id) {
  const imagenes = await ProductoImagen.findAll({
    where: { producto_id: id }
  })
  return imagenes.map(imagen => imagen.url_imagen)
}

module.exports = {
  cargarProductos,
  cargarImagenesProducto
}
