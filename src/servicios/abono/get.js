async function cargarAbonosCliente (id, query) {
  // Se traen los abonos al cliente con el id que se recibe
  const { count, rows } = await Abono.findAndCountAll({
    where: {
      cliente_id: id
    },
    attributes: OpcionesAbonos.atributos(),
    include: OpcionesAbonos.incluir(),
    limit: Math.min(Number(query.limit), 50),
    offset: Number(query.offset),
    order: [['id', 'DESC']]
  })
  return { count, rows }
}
