const {
  CompraEstadoEntrega,
  CompraEstadoPago,
  Cliente,
  Producto,
  ProductoMedida
} = require('../../database/models')

const { Op, col } = require('sequelize')

// Opciones para encontrar todas las facturas. (se pueden filtrar)

// Opciones para obtener toda la informacion de una sala factura de compra

// Opciones para extraer los detalles de o productos de una factura de compra.

module.exports = {
  OpcionesGetCompras,
  OpcionesGetCompra,
  OpcionesGetDetalle
}
