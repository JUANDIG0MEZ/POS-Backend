const { OpcionesGetCompras, OpcionesGetDetalle } = require('./opciones/get.js')
const { Compra, CompraEstadoEntrega, CompraEstadoPago, DetalleCompra } = require('../../database/models')
const { FormatearGetCompras, FormatearGetDetalleCompra } = require('./formatear/index.js')

async function cargarCompraEstadoEntrega () {
  const estados = CompraEstadoEntrega.findAll()
  return estados
}

async function cargarCompraEstadoPago () {
  const estados = await CompraEstadoPago.findAll({ raw: true })
  return estados
}

async function cargarCompras ({ idUsuario, compra_id, cliente_id, id_estado_entrega, id_estado_pago, fechaInicio, fechaFinal, columna, orden, offset, limit }) {
  const { count, rows } = await Compra.findAndCountAll(
    {
      where: await OpcionesGetCompras.donde({ idUsuario, compra_id, cliente_id, id_estado_entrega, id_estado_pago, fechaInicio, fechaFinal }),
      include: OpcionesGetCompras.incluir(),
      attributes: OpcionesGetCompras.atributos(),
      limit,
      offset,
      order: OpcionesGetCompras.orden({ orden, columna }),
      raw: true

    }
  )

  return { count, rows: FormatearGetCompras.formatearLista(rows) }
}

async function cargarCompra ({ idUsuario, compra_id }) {
  const compra = await Compra.findOne({ where: { id_usuario: idUsuario, compra_id } })
  const datos = await DetalleCompra.findAll({
    where: { id_compra: compra.id },
    attributes: OpcionesGetDetalle.atributos(),
    include: OpcionesGetDetalle.incluir(),
    raw: true
  })

  return { datos: FormatearGetDetalleCompra.formatearLista(datos), info: compra }
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
  cargarCompraEstadoPago,
  cargarCompra
}
