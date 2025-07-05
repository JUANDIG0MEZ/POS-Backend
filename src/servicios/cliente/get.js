const {
  Cliente,
  ClienteTipo,
  Abono,
  Pago,
  Venta,
  Compra
} = require('../../database/models')

const {
  FormatearGetVentaCliente,
  FormatearGetCompraCliente,
  FormatearGetAbonoCliente,
  FormatearGetPagoCliente,
  FormatearGetClientes
} = require('./formatear/get.js')

const {
  OpcionesGetCliente,
  OpcionesGetClientes,
  OpcionesGetClienteCompra,
  OpcionesGetClienteAbono,
  OpcionesGetClientePago,
  OpcionesGetClienteVenta
} = require('./opciones/get.js')

async function cargarClienteTipos () {
  const tipos = await ClienteTipo.findAll()
  return tipos
}

async function cargarCliente ({ idUsuario, cliente_id }) {
  const cliente = await Cliente.findOne({
    where: { id_usuario: idUsuario, cliente_id },
    attributes: OpcionesGetCliente.atributos(),
    include: OpcionesGetCliente.incluir()

  })

  return cliente
}

async function cargarClientes ({ idUsuario, orden, columna, offset, limit, cliente_id, id_tipo }) {
  const { count, rows } = await Cliente.findAndCountAll({
    attributes: OpcionesGetClientes.atributos(),
    include: OpcionesGetClientes.incluir(),
    where: OpcionesGetClientes.donde({ idUsuario, cliente_id, id_tipo }),
    limit,
    offset,
    order: OpcionesGetClientes.orden({ orden, columna }),
    raw: true
  })
  return { count, rows: FormatearGetClientes.formatearLista(rows) }
}

async function cargarClientesNombres ({ idUsuario }) {
  const clientes = await Cliente.findAll({
    where: { id_usuario: idUsuario },
    attributes: ['nombre', 'cliente_id']
  })

  const clientesFormateados = FormatearGetClientes.formatearLista(clientes)
  return clientesFormateados
}

async function cargarVentasCliente ({ idUsuario, cliente_id, limit }) {
  const cliente = await Cliente.findOne({ where: { id_usuario: idUsuario, cliente_id } })
  const { count, rows } = await Venta.findAndCountAll({
    where: { id_usuario: idUsuario, id_cliente: cliente.id },
    attributes: OpcionesGetClienteVenta.atributos(),
    include: OpcionesGetClienteVenta.incluir(),
    limit
  })
  return { count, rows: FormatearGetVentaCliente.formatearLista(rows) }
}

async function cargarComprasCliente ({ idUsuario, cliente_id, limit }) {
  const cliente = await Cliente.findOne({ where: { id_usuario: idUsuario, cliente_id } })
  const { count, rows } = await Compra.findAndCountAll({
    where: { id_usuario: idUsuario, id_cliente: cliente.id },
    attributes: OpcionesGetClienteCompra.atributos(),
    include: OpcionesGetClienteCompra.incluir(),
    limit,
    raw: true

  })
  return { count, rows: FormatearGetCompraCliente.formatearLista(rows) }
}

async function cargarAbonosCliente ({ idUsuario, cliente_id, limit }) {
  const cliente = await Cliente.findOne({ where: { id_usuario: idUsuario, cliente_id } })
  const { count, rows } = await Abono.findAndCountAll({
    where: { id_usuario: idUsuario, id_cliente: cliente.id },
    attributes: OpcionesGetClienteAbono.atributos(),
    include: OpcionesGetClienteAbono.incluir(),
    limit,
    raw: true
  })
  return { count, rows: FormatearGetAbonoCliente.formatearLista(rows) }
}

async function cargarPagosCliente ({ idUsuario, cliente_id, limit }) {
  const cliente = await Cliente.findOne({ where: { id_usuario: idUsuario, cliente_id } })
  const { count, rows } = await Pago.findAndCountAll({
    where: { id_usuario: idUsuario, id_cliente: cliente.id },
    attributes: OpcionesGetClientePago.atributos(),
    include: OpcionesGetClientePago.incluir(),
    limit,
    raw: true
  })
  return { count, rows: FormatearGetPagoCliente.formatearLista(rows) }
}

module.exports = {
  cargarCliente,
  cargarClientes,
  cargarClienteTipos,
  cargarClientesNombres,
  cargarVentasCliente,
  cargarComprasCliente,
  cargarAbonosCliente,
  cargarPagosCliente
}
