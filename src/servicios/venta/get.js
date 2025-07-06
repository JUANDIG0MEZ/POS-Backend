const { OpcionesGetVenta, OpcionesGetVentas, OpcionesGetDetalleVenta } = require('./opciones/get')
const { Venta, VentaEstadoEntrega, VentaEstadoPago, DetalleVenta, Cliente } = require('../../database/models')
const { FormatearGetVentas, FormatearGetDetallesVenta } = require('./formatear')

async function cargarVentaEstadoEntrega () {
  const estados = await VentaEstadoEntrega.findAll({})
  return estados
}

async function cargarVentaEstadoPago () {
  const estados = await VentaEstadoPago.findAll()
  return estados
}

async function cargarVentas ({ idUsuario, venta_id, cliente_id, id_estado_entrega, id_estado_pago, fechaInicio, fechaFinal, columna, orden, offset, limit }) {
  const { count, rows } = await Venta.findAndCountAll(
    {
      attributes: OpcionesGetVentas.atributos(),
      include: OpcionesGetVentas.incluir(),
      where: OpcionesGetVentas.donde({ idUsuario, venta_id, cliente_id, id_estado_entrega, id_estado_pago, fechaInicio, fechaFinal }),
      order: OpcionesGetVentas.orden({ columna, orden }),
      limit,
      offset,
      raw: true
    }
  )
  return { count, rows: FormatearGetVentas.formatearLista(rows) }
}

async function cargarVenta ({ idUsuario, venta_id }) {
  const venta = await Venta.findOne({
    where: { id_usuario: idUsuario, venta_id },
    attributes: OpcionesGetVenta.atributos()
  })

  const detalles = await DetalleVenta.findAll({
    where: { id_venta: venta.id },
    attributes: OpcionesGetDetalleVenta.atributos(),
    include: OpcionesGetDetalleVenta.incluir(),
    raw: true
  })
  return { datos: FormatearGetDetallesVenta.formatearLista(detalles), info: venta }
}

module.exports = {
  cargarVentaEstadoEntrega,
  cargarVentaEstadoPago,
  cargarVentas,
  cargarVenta
}
