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

async function cargarDatosIniciales () {
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
    Producto.findAll(InitOptions.Producto()),
    Cliente.findAll(InitOptions.Cliente()),
    ProductoCategoria.findAll(InitOptions.ProductoCategoria()),
    ProductoMedida.findAll(InitOptions.ProductoMedida()),
    CompraEstadoEntrega.findAll(InitOptions.CompraEstadoEntrega()),
    CompraEstadoPago.findAll(InitOptions.CompraEstadoPago()),
    VentaEstadoEntrega.findAll(InitOptions.VentaEstadoEntrega()),
    VentaEstadoPago.findAll(InitOptions.VentaEstadoPago()),
    ClienteTipo.findAll(InitOptions.ClienteTipo()),
    MetodoPago.findAll(InitOptions.MetodoPago())
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
