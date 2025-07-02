const {
  Cliente,
  ClienteTipo
  // Abono,
  // Pago,
  // Venta,
  // Compra
} = require('../../database/models')
const { FormatearClientes } = require('./formatear/index.js')

const {
  OpcionesGet
} = require('./opciones/get.js')

async function cargarClienteTipos () {
  const tipos = await ClienteTipo.findAll()
  return tipos
}

// async function cargarCliente (id) {
//   const cliente = await Cliente.findByPk(id, {
//     attributes: ClaseCliente.atributos(),
//     include: ClaseCliente.incluir()
//   })

//   return cliente
// }

async function cargarClientes ({ idUsuario, orden, columna, offset, limit, cliente_id, id_tipo }) {
  const { count, rows } = await Cliente.findAndCountAll({
    attributes: OpcionesGet.atributos(),
    include: OpcionesGet.incluir(),
    where: OpcionesGet.donde({ idUsuario, cliente_id, id_tipo }),
    limit,
    offset,
    order: OpcionesGet.orden({ orden, columna }),
    raw: true
  })
  return { count, rows: FormatearClientes.formatearLista(rows) }
}

async function cargarClientesNombres ({ idUsuario }) {
  const clientes = await Cliente.findAll({
    where: { id_usuario: idUsuario },
    attributes: ['nombre', 'cliente_id']
  })

  const clientesFormateados = FormatearClientes.formatearLista(clientes)

  return clientesFormateados
}

module.exports = {
  cargarClientes,
  cargarClienteTipos,
  cargarClientesNombres
}
