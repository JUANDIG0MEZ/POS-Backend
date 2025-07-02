const { OpcionesGetVentas } = require('./opciones/get')
const { Venta, VentaEstadoEntrega, VentaEstadoPago } = require('../../database/models')

async function cargarVentaEstadoEntrega () {
  const estados = await VentaEstadoEntrega.findAll({})
  return estados
}

async function cargarVentaEstadoPago () {
  const estados = await VentaEstadoPago.findAll()
  return estados
}

async function cargarVentas (idUsuario, venta_id, cliente_id, estado_entrega_id, estado_pago_id, fechaInicio, fechaFinal, columna, orden, offset, limit) {
  const { count, rows } = await Venta.findAndCountAll(
    {
      attributes: OpcionesGetVentas.atributos(),
      include: OpcionesGetVentas.incluir(),
      where: OpcionesGetVentas.donde({ idUsuario, venta_id, cliente_id, estado_entrega_id, estado_pago_id, fechaInicio, fechaFinal }),
      order: OpcionesGetVentas.orden({ columna, orden }),
      limit,
      offset,
      raw: true
    }
  )
  return { count, rows }
}

// async function cargarFacturaVenta (id) {
//   const info = await Venta.findByPk(id, {
//     attributes: OpcionesGetVenta.atributos(),
//     include: OpcionesGetVenta.incluir()
//   })

//   const datos = await DetalleVenta.findAll({
//     where: {
//       venta_id: id
//     },
//     attributes: OpcionesGetDetalle.atributos(),
//     include: OpcionesGetDetalle.incluir(),
//     raw: true
//   })

//   const datosFormateados = OpcionesGetDetalle.formatear(datos)

//   return { datos: datosFormateados, info }
// }

// module.exports = {
//   cargarFacturasVenta,
//   cargarFacturaVenta

// }

// async function cargarVentasCliente (clienteId, query) {
//   const { count, rows } = await Venta.findAndCountAll({
//     where: OpcionesVentas.donde(clienteId),
//     include: OpcionesVentas.incluir(),
//     attributes: OpcionesVentas.atributos(),
//     order: OpcionesVentas.orden(),
//     limit: Math.min(Number(query.limit), 50),
//     offset: Number(query.offset)
//   })

//   return { count, rows }
// }

module.exports = {
  cargarVentaEstadoEntrega,
  cargarVentaEstadoPago,
  cargarVentas
}
