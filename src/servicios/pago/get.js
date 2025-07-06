// async function cargarPagoCliente ({ idUsuario }) {
//   // Se traen los pagos al cliente con el id que se recibe
//   const { count, rows } = await Pago.findAndCountAll({
//     where: OpcionesPagos.donde(clienteId),
//     attributes: OpcionesPagos.atributos(),
//     include: OpcionesPagos.incluir(),
//     limit: Math.min(Number(query.limit), 50),
//     offset: Number(query.offset),
//     order: [['id', 'DESC']]
//   })

//   return { count, rows }
// }
