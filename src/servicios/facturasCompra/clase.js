const {
  CompraEstadoEntrega,
  CompraEstadoPago,
  Cliente,
  Producto,
  ProductoMarca,
  ProductoMedida
} = require('../../database/models')

const { Op, col } = require('sequelize')

// Opciones para encontrar todas las facturas. (se pueden filtrar)
class OpcionesGetCompras {
  static atributos () {
    const attributes = {
      exclude: ['cliente_id', 'estado_entrega_id', 'estado_pago_id', 'pagado'],
      include: [
        [col('estadoEntregaCompra.nombre'), 'metodo_entrega'],
        [col('estadoPagoCompra.nombre'), 'estado_pago']]
    }
    return attributes
  }

  static incluir () {
    const include = [
      { model: CompraEstadoEntrega, attributes: [], as: 'estadoEntregaCompra' },
      { model: CompraEstadoPago, attributes: [], as: 'estadoPagoCompra' }]

    return include
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
      return [[{ model: Cliente, as: 'clienteCompra' }, 'nombre', orden]]
    }

    return [[columna, orden]]
  }
}

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
        [col('productoDetalleCompra.marcaProducto.nombre'), 'marca'],
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
          { model: ProductoMarca, as: 'marcaProducto', attributes: [] },
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
        descripcion: detalle.nombre + ' - ' + detalle.marca,
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
