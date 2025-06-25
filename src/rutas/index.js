const express = require('express')
const productos = require('./productos.js')
const clientes = require('./clientes.js')
const facturaCompra = require('./facturaCompra.js')
const facturaVenta = require('./facturaVenta.js')
const autenticacion = require('./autenticacion.js')
const pagos = require('./pagos')
const init = require('./init')

function routerAPI (app) {
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/productos', productos)
  router.use('/facturas/compras', facturaCompra)
  router.use('/facturas/ventas', facturaVenta)
  router.use('/clientes', clientes)
  router.use('/pagos', pagos)
  router.use('/init', init)
  router.use('/autenticacion', autenticacion)
}

module.exports = routerAPI
