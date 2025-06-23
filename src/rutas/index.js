const express = require('express')
const productosRouter = require('./productosRouter')
const clientesRouter = require('./clientesRouter')
const facturaCompraRouter = require('./facturaCompraRouter')
const facturaVentaRouter = require('./facturaVentaRouter')
const autenticacionRouter = require('./autenticacionRouter')
// const pagosRouter = require('./pagos')
const initRouter = require('./init')

function routerAPI (app) {
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/productos', productosRouter)
  router.use('/facturas/compras', facturaCompraRouter)
  router.use('/facturas/ventas', facturaVentaRouter)
  router.use('/clientes', clientesRouter)
  // router.use('/pagos', pagosRouter)
  router.use('/init', initRouter)
  router.use('/autenticacion', autenticacionRouter)
}

module.exports = routerAPI
