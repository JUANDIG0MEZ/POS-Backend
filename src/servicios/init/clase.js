const {
  // Producto,
  // Cliente,
  // ClienteTipo,
  ProductoMedida,
  ProductoCategoria

  // CompraEstadoEntrega,
  // CompraEstadoPago,
  // VentaEstadoEntrega,
  // VentaEstadoPago,
  // Clientetipo,
  // MetodoPago,
  // sequelize
} = require('../../database/models')

const { col } = require('sequelize')

class InitOptions {
  static Producto () {
    const attributes = {
      exclude: ['categoria_id', 'medida_id'],
      include: [
        [col('medidaProducto.nombre'), 'medida'],
        [col('categoriaProducto.nombre'), 'categoria']
      ]
    }

    const include = [
      { model: ProductoMedida, attributes: [], as: 'medidaProducto' },
      { model: ProductoCategoria, attributes: [], as: 'categoriaProducto' }
    ]

    return {
      attributes,
      include

    }
  }

  static Cliente () {
    const attributes = ['id', 'nombre']
    return {
      attributes

    }
  }

  static ProductoCategoria () {
    return {

    }
  }

  static ProductoMedida () {
    return {

    }
  }

  static CompraEstadoEntrega () {
    return {

    }
  }

  static CompraEstadoPago () {
    return {

    }
  }

  static VentaEstadoEntrega () {
    return {

    }
  }

  static VentaEstadoPago () {
    return {

    }
  }

  static ClienteTipo () {
    return {

    }
  }

  static MetodoPago () {
    return {

    }
  }
}

module.exports = {
  InitOptions
}
