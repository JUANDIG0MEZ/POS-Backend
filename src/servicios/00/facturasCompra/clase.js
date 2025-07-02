const {
  CompraEstadoEntrega,
  CompraEstadoPago,
  Cliente,
  Producto,
  ProductoMedida
} = require('../../database/models')

const { Op, col } = require('sequelize')

// Opciones para encontrar todas las facturas. (se pueden filtrar)

// Opciones para obtener toda la informacion de una sala factura de compra
class OpcionesGetCompra {
  static atributos () {
    const attributes = {
      include: [
        [col('clienteCompra.telefono'), 'telefono'],
        [col('clienteCompra.email'), 'email']
      ]

    }

    return attributes
  }

  static incluir () {
    const include = {
      model: Cliente,
      as: 'clienteCompra',
      attributes: []
    }

    return include
  }
}

// Opciones para extraer los detalles de o productos de una factura de compra.
class OpcionesGetDetalle {
  static atributos () {
    const attributes = {
      exclude: ['compra_id', 'id'],

      include: [

        [col('productoDetalleCompra.nombre'), 'nombre'],
        [col('productoDetalleCompra.medidaProducto.nombre'), 'medida']]
    }

    return attributes
  }

  static incluir () {
    const include = [
      {
        model: Producto,
        as: 'productoDetalleCompra',
        attributes: [],
        include: [
          { model: ProductoMedida, as: 'medidaProducto', attributes: [] }
        ]
      }

    ]
    return include
  }

  static formatear (detalles) {
    return detalles.map((detalle) => (
      {
        id: detalle.producto_id,
        descripcion: detalle.nombre,
        medida: detalle.medida,
        cantidad: detalle.cantidad,
        precio: detalle.precio,
        subtotal: detalle.subtotal
      }
    )

    )
  }
}

module.exports = {
  OpcionesGetCompras,
  OpcionesGetCompra,
  OpcionesGetDetalle
}
