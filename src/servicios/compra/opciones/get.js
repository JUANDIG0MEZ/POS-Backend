const { Compra, Cliente, CompraEstadoEntrega, CompraEstadoPago } = require('../../../database/models')
const { col, Op } = require('sequelize')

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

  //
  static donde ({ idUsuario, compra_id, cliente_id, id_estado_entrega, id_estado_pago, fechaInicio, fechaFinal }) {
    const where = { id_usuario: idUsuario }

    if (compra_id) {
      where.compra_id = compra_id
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
    const columna2 = columna || 'compra_id'

    return [[columna2, orden2]]
  }
}

module.exports = {
  OpcionesGetCompras
}
