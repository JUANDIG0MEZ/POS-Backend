const {
  Cliente,
  VentaEstadoEntrega,
  VentaEstadoPago,
  Producto,
  ProductoMedida
} = require('../../database/models')

const { Op, col } = require('sequelize')

class OpcionesGetVenta {
  static atributos () {
    const attributes = {
      include: [
        [col('clienteVenta.telefono'), 'telefono'],
        [col('clienteVenta.email'), 'email']
      ]
    }

    return attributes
  }

  static incluir () {
    const include = { model: Cliente, as: 'clienteVenta', attributes: [] }
    return include
  }
}

class OpcionesGetDetalle {
  static atributos () {
    const attributes = {
      exclude: ['venta_id', 'id'],
      include: [
        [col('productoDetalleVenta.nombre'), 'nombre'],
        [col('productoDetalleVenta.medidaProducto.nombre'), 'medida']]
    }

    return attributes
  }

  static incluir () {
    const include = [
      {
        model: Producto,
        as: 'productoDetalleVenta',
        attributes: [],
        include: [
          { model: ProductoMedida, as: 'medidaProducto', attributes: [] }
        ]
      }]

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
  OpcionesGetVentas,
  OpcionesGetDetalle,
  OpcionesGetVenta
}
