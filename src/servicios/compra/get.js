async function cargarFacturaCompra (id) {
  const info = await Compra.findByPk(id, {
    attributes: OpcionesGetCompra.atributos(),
    include: OpcionesGetCompra.incluir()
  })

  const datos = await DetalleCompra.findAll({
    where: {
      compra_id: id
    },
    attributes: OpcionesGetDetalle.atributos(),
    include: OpcionesGetDetalle.incluir(),
    raw: true
  })

  const datosFormateados = OpcionesGetDetalle.formatear(datos)

  return { datos: datosFormateados, info }
}

async function cargarFacturasCompra (query) {
  const { count, rows } = await Compra.findAndCountAll(
    {
      include: OpcionesGetCompras.incluir(),
      where: OpcionesGetCompras.donde(query),
      attributes: OpcionesGetCompras.atributos(query),
      limit: Math.min(Number(query.limit), 100),
      offset: Number(query.offset),
      order: OpcionesGetCompras.orden(query),
      raw: true
    }
  )
  return { count, rows }
}

async function cargarComprasCliente (clienteId, query) {
  const { count, rows } = await Compra.findAndCountAll({
    where: OpcionesCompras.donde(clienteId),
    attributes: OpcionesCompras.atributos(),
    include: OpcionesCompras.incluir(),
    order: OpcionesCompras.orden(),
    limit: Math.min(Number(query.limit), 50),
    offset: Number(query.offset)
  })

  return { count, rows }
}
