const { OpcionesGetCompras } = require('./opciones/get.js')

const { Compra, CompraEstadoEntrega, CompraEstadoPago } = require('../../database/models')

async function cargarCompraEstadoEntrega () {
  const estados = CompraEstadoEntrega.findAll()
  return estados
}

async function cargarCompraEstadoPago () {
  const estados = await CompraEstadoPago.findAll({ raw: true })
  return estados
}

// async function cargarFacturaCompra (id) {
//   const info = await Compra.findByPk(id, {
//     attributes: OpcionesGetCompra.atributos(),
//     include: OpcionesGetCompra.incluir()
//   })

//   const datos = await DetalleCompra.findAll({
//     where: {
//       compra_id: id
//     },
//     attributes: OpcionesGetDetalle.atributos(),
//     include: OpcionesGetDetalle.incluir(),
//     raw: true
//   })

//   const datosFormateados = OpcionesGetDetalle.formatear(datos)

//   return { datos: datosFormateados, info }
// }

async function cargarCompras ({ idUsuario, compra_id, cliente_id, id_estado_entrega, id_estado_pago, fechaInicio, fechaFinal, columna, orden, offset, limit }) {
  const { count, rows } = await Compra.findAndCountAll(
    {
      // id, estado_entrega_id, cliente_id, fecha_desde, fecha_hasta, estado_pago_id
      where: OpcionesGetCompras.donde({ idUsuario, compra_id, cliente_id, id_estado_entrega, id_estado_pago, fechaInicio, fechaFinal }),
      include: OpcionesGetCompras.incluir(),

      attributes: OpcionesGetCompras.atributos(),
      limit,
      offset,
      order: OpcionesGetCompras.orden(orden, columna),
      raw: true

    }
  )

  return { count, rows }
}

// async function cargarComprasCliente (clienteId, query) {
//   const { count, rows } = await Compra.findAndCountAll({
//     where: OpcionesCompras.donde(clienteId),
//     attributes: OpcionesCompras.atributos(),
//     include: OpcionesCompras.incluir(),
//     order: OpcionesCompras.orden(),
//     limit: Math.min(Number(query.limit), 50),
//     offset: Number(query.offset)
//   })

//   return { count, rows }
// }

module.exports = {
  cargarCompras,
  cargarCompraEstadoEntrega,
  cargarCompraEstadoPago
}
