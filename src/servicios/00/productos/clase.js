const {
  ProductoMedida,
  ProductoCategoria
} = require('../../database/models')

const { col } = require('sequelize')

class ClaseProducto {
  static atributos () {
    return {
      exclude: ['categoria_id', 'medida_id'],
      include: [
        [col('medidaProducto.nombre'), 'medida'],
        [col('categoriaProducto.nombre'), 'categoria']]
    }
  }

  static incluir () {
    return [
      { model: ProductoMedida, attributes: [], as: 'medidaProducto' },
      { model: ProductoCategoria, attributes: [], as: 'categoriaProducto' }
    ]
  }

  static formatearLista (productos, permisos) {
    return productos.map(producto => this.formatear(producto))
  }

  static formatear (producto) {
    return {
      id: producto.id,
      nombre: producto.nombre,
      categoria: producto.categoria,
      medida: producto.medida,
      precio_venta: producto.precio_venta,
      precio_compra: producto.precio_compra,
      cantidad: producto.cantidad,
      total: producto.total
    }
  }
}

module.exports = {
  ClaseProducto
}
