const { Op, col } = require('sequelize')
const {
  VentaEstadoEntrega,
  VentaEstadoPago,
  Cliente
} = require('../../../database/models')
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

  static donde ({ idUsuario, venta_id, cliente_id, estado_entrega_id, estado_pago_id, fechaInicio, fechaFinal }) {
    const where = { id_usuario: idUsuario }

    if (venta_id) {
      where.venta_id = venta_id
      return where
    }

    if (estado_entrega_id) where.estado_entrega_id = estado_entrega_id
    if (estado_pago_id) where.estado_pago_id = estado_pago_id
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

module.exports = {
  OpcionesGetVentas
}
