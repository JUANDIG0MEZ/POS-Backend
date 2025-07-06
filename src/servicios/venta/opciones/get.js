const { Op, col } = require('sequelize')
const {
  VentaEstadoEntrega,
  VentaEstadoPago,
  Producto,
  ProductoMedida
} = require('../../../database/models')

class OpcionesGetVenta {
  static atributos () {
    const attributes = {
      exclude: ['id_usuario', 'estado_pago_id', 'por_pagar', 'cliente_id']
    }

    return attributes
  }
}

class OpcionesGetVentas {
  static atributos () {
    const attributes = {
      exclude: ['id_estado_pago', 'id_estado_entrega', 'pagado', 'cliente_id'],
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

  static donde ({ idUsuario, venta_id, cliente_id, id_estado_entrega, id_estado_pago, fechaInicio, fechaFinal }) {
    const where = { id_usuario: idUsuario }

    if (venta_id) {
      where.venta_id = venta_id
      return where
    }

    if (id_estado_entrega) where.id_estado_entrega = id_estado_entrega
    if (id_estado_pago) where.id_estado_pago = id_estado_pago
    if (cliente_id) where.cliente_id = cliente_id
    if (fechaInicio || fechaFinal) {
      if (!fechaInicio) fechaInicio = '1900-01-01'
      if (!fechaFinal) fechaFinal = new Date().toISOString().split('T')[0]

      where.fecha = {
        [Op.between]: [fechaInicio, fechaFinal]
      }
    }

    return where
  }

  static orden ({ orden, columna }) {
    const orden2 = orden || 'ASC'
    const columna2 = columna || 'venta_id'

    return [[columna2, orden2]]
  }
}

class OpcionesGetDetalleVenta {
  static atributos () {
    const attributes = {
      exclude: ['compra_id'],
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
}

module.exports = {
  OpcionesGetVenta,
  OpcionesGetVentas,
  OpcionesGetDetalleVenta
}
