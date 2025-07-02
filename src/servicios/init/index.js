const {
  Producto,
  Cliente,
  ClienteTipo,
  ProductoMedida,
  ProductoCategoria,

  CompraEstadoEntrega,
  CompraEstadoPago,
  VentaEstadoEntrega,
  VentaEstadoPago,

  MetodoPago
} = require('../../database/models')

const {
  InitOptions
} = require('./clase')

async function cargarDatosIniciales ({ idUsuario }) {
  const [
    producto,
    clientes,
    productoCategoria,
    productoMedida,
    compraEstadoEntrega,
    compraEstadoPago,
    ventaEstadoEntrega,
    ventaEstadoPago,
    clienteTipo,
    metodoPago
  ] = await Promise.all([
    Producto.findAll(InitOptions.Producto().where({ usuario_id: idUsuario })),
    Cliente.findAll(InitOptions.Cliente()).where({ usuario_id: idUsuario }),
    ProductoCategoria.findAll(InitOptions.ProductoCategoria().where({ usuario_id: idUsuario })),
    ProductoMedida.findAll(InitOptions.ProductoMedida().where({ usuario_id: idUsuario })),
    CompraEstadoEntrega.findAll(InitOptions.CompraEstadoEntrega().where({ usuario_id: idUsuario })),
    CompraEstadoPago.findAll(InitOptions.CompraEstadoPago().where({ usuario_id: idUsuario })),
    VentaEstadoEntrega.findAll(InitOptions.VentaEstadoEntrega().where({ usuario_id: idUsuario })),
    VentaEstadoPago.findAll(InitOptions.VentaEstadoPago().where({ usuario_id: idUsuario })),
    ClienteTipo.findAll(InitOptions.ClienteTipo().where({ usuario_id: idUsuario })),
    MetodoPago.findAll(InitOptions.MetodoPago().where({ usuario_id: idUsuario }))
  ])

  return {
    producto,
    clientes,
    productoCategoria,
    productoMedida,
    compraEstadoEntrega,
    compraEstadoPago,
    ventaEstadoEntrega,
    ventaEstadoPago,
    clienteTipo,
    metodoPago
  }
}

module.exports = {
  cargarDatosIniciales
}
