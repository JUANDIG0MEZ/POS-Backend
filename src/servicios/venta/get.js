async function cargarFacturasVenta (query) {
  const { count, rows } = await Venta.findAndCountAll(
    {
      attributes: OpcionesGetVentas.atributos(),
      include: OpcionesGetVentas.incluir(),
      where: OpcionesGetVentas.donde(query),
      limit: Math.min(Number(query.limit), 100),
      offset: Number(query.offset),
      order: OpcionesGetVentas.orden(query)
    }
  )
  return { count, rows }
}

async function cargarFacturaVenta (id) {
  const info = await Venta.findByPk(id, {
    attributes: OpcionesGetVenta.atributos(),
    include: OpcionesGetVenta.incluir()
  })

  const datos = await DetalleVenta.findAll({
    where: {
      venta_id: id
    },
    attributes: OpcionesGetDetalle.atributos(),
    include: OpcionesGetDetalle.incluir(),
    raw: true
  })

  const datosFormateados = OpcionesGetDetalle.formatear(datos)

  return { datos: datosFormateados, info }
}

module.exports = {
  cargarFacturasVenta,
  cargarFacturaVenta

}

async function cargarVentasCliente (clienteId, query) {
  const { count, rows } = await Venta.findAndCountAll({
    where: OpcionesVentas.donde(clienteId),
    include: OpcionesVentas.incluir(),
    attributes: OpcionesVentas.atributos(),
    order: OpcionesVentas.orden(),
    limit: Math.min(Number(query.limit), 50),
    offset: Number(query.offset)
  })

  return { count, rows }
}
