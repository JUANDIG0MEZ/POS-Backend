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

async function cargarCliente (id) {
  const cliente = await Cliente.findByPk(id, {
    attributes: ClaseCliente.atributos(),
    include: ClaseCliente.incluir()
  })

  return cliente
}

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
