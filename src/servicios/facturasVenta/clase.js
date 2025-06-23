const {
  Cliente,
  VentaEstadoEntrega,
  VentaEstadoPago,
  Producto,
  ProductoMedida
} = require('../../database/models')

const { Op, col } = require('sequelize')

class OpcionesGetVentas {
  static atributos () {
    const attributes = {
      exclude: ['estado_pago_id', 'estado_entrega_id', 'pagado', 'cliente_id'],
      include: [
        [col('estadoEntregaVenta.nombre'), 'estado_entrega'],
        [col('estadoPagoVenta.nombre'), 'estado_pago']]
    }

    return attributes
  }

  static incluir () {
    return [
      { model: VentaEstadoEntrega, as: 'estadoEntregaVenta', attributes: [] },
      { model: VentaEstadoPago, as: 'estadoPagoVenta', attributes: [] }
    ]
  }

  static donde (query) {
    const where = {}

    if (Number(query.id)) {
      where.id = query.id
      return where
    }

    if (Number(query.estado_entrega_id)) {
      where.estado_entrega_id = query.estado_entrega_id
    }

    if (Number(query.estado_pago_id)) {
      where.estado_pago_id = query.estado_pago_id
    }

    if (Number(query.cliente_id)) {
      where.cliente_id = Number(query.cliente_id)
    }

    if (query.fecha_desde || query.fecha_hasta) {
      if (!query.fecha_desde) {
        query.fecha_desde = '1900-01-01'
      }
      if (!query.fecha_hasta) {
        query.fecha_hasta = new Date().toISOString().split('T')[0] // Fecha actual
      }

      where.fecha = {
        [Op.between]: [query.fecha_desde, query.fecha_hasta]
      }
    }

    return where
  }

  static orden (query) {
    const orden = query.orden ? query.orden : 'ASC'
    const columna = query.columna ? query.columna : 'id'

    if (columna === 'cliente') {
      return [[{ model: Cliente, as: 'clienteVenta' }, 'nombre', orden]]
    }

    return [[columna, orden]]
  }
}

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
