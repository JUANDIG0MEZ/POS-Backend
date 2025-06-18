const {
  Cliente,
  Abono,
  Pago,
  Venta,
  Compra
} = require('../../database/models')

const {
  ClaseClientes,
  ClaseCliente,
  OpcionesAbonos,
  OpcionesPagos,
  OpcionesVentas,
  OpcionesCompras
} = require('./clase')

async function cargarClientes (query) {
  const { count, rows } = await Cliente.findAndCountAll({
    attributes: ClaseClientes.atributos(),
    include: ClaseClientes.incluir(),
    where: ClaseClientes.donde(query),
    limit: Math.min(Number(query.limit), 100),
    offset: Number(query.offset),
    order: ClaseClientes.orden(query)
  })
  return { count, rows }
}

async function cargarCliente (id) {
  const cliente = await Cliente.findByPk(id, {
    attributes: ClaseCliente.atributos(),
    include: ClaseCliente.incluir()
  })

  return cliente
}

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

async function cargarPagosCliente (clienteId, query) {
  // Se traen los pagos al cliente con el id que se recibe
  const { count, rows } = await Pago.findAndCountAll({
    where: OpcionesPagos.donde(clienteId),
    attributes: OpcionesPagos.atributos(),
    include: OpcionesPagos.incluir(),
    limit: Math.min(Number(query.limit), 50),
    offset: Number(query.offset),
    order: [['id', 'DESC']]
  })

  return { count, rows }
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
module.exports = {
  cargarClientes,
  cargarAbonosCliente,
  cargarPagosCliente,
  cargarCliente,
  cargarVentasCliente,
  cargarComprasCliente
}
