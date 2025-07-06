class FormatearGetCategoria {
  static formatear (categoria) {
    return {
      id: categoria.categoria_id,
      nombre: categoria.nombre,
      descripcion: categoria.descripcion
    }
  }

  static formatearLista (categorias) {
    return categorias.map(categoria => this.formatear(categoria))
  }
}

class FormatearGetProducto {
  static formatear (producto) {
    return {
      id: producto.producto_id,
      nombre: producto.nombre,
      categoria: producto.categoria,
      medida: producto.medida,
      precio_venta: producto.precio_venta,
      precio_compra: producto.precio_compra,
      cantidad: producto.cantidad,
      total: producto.total
    }
  }

  static formatearLista (productos) {
    return productos.map(producto => this.formatear(producto))
  }
}

module.exports = {
  FormatearGetCategoria,
  FormatearGetProducto
}
