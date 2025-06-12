const {
  Cliente,
  Abono,
  Pago,
  Venta,
  Compra,
  VentaEstadoPago,
  CompraEstadoPago
} = require('../../database/models')

const { col } = require('sequelize')

const {
  ClaseClientes,
  ClaseCliente
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
    attributes: {
      exclude: ['cliente_id']
    },
    limit: Math.min(Number(query.limit), 50),
    offset: Number(query.offset),
    order: [['id', 'DESC']]
  })
  return { count, rows }
}

async function cargarPagosCliente (id, query) {
  // Se traen los pagos al cliente con el id que se recibe
  const { count, rows } = await Pago.findAndCountAll({
    where: {
      cliente_id: id
    },
    attributes: {
      exclude: ['cliente_id']
    },
    limit: Math.min(Number(query.limit), 50),
    offset: Number(query.offset),
    order: [['id', 'DESC']]
  })
  return { count, rows }
}

async function cargarVentasCliente (id, query) {
  const { count, rows } = await Venta.findAndCountAll({

    where: {
      cliente_id: id
    },
    attributes: {
      exclude: ['cliente_id', 'nombre_cliente', 'pagado'],
      include: [
        [col('estadoPagoVenta.nombre'), 'Estado pago']
      ]
    },
    include: [
      { model: VentaEstadoPago, attributes: [], as: 'estadoPagoVenta' }
    ],
    order: [['id', 'DESC']],
    limit: Math.min(Number(query.limit), 50),
    offset: Number(query.offset)
  })

  return { count, rows }
}

async function cargarComprasCliente (id, query) {
  const { count, rows } = await Compra.findAndCountAll({

    where: {
      cliente_id: id
    },
    attributes: {
      exclude: ['cliente_id', 'nombre_cliente', 'pagado'],
      include: [
        [col('estadoPagoCompra.nombre'), 'Estado pago']
      ]
    },
    include: [
      { model: CompraEstadoPago, attributes: [], as: 'estadoPagoCompra' }
    ],
    order: [['id', 'DESC']],
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
