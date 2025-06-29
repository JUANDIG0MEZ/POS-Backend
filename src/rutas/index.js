const express = require('express')
const autenticacion = require('./autenticacion.js')
const producto = require('./producto.js')
const { requireUser } = require('../middlewares/autenticationHandler.js')
// const cliente = require('./cliente.js')
// const compra = require('./compra.js')
// const venta = require('./venta.js')

// const pago = require('./pago')
// const init = require('./init')

function routerAPI (app) {
  const router = express.Router()
  app.use('/api/v1', router)

  router.use('/autenticacion', autenticacion)
  app.use(requireUser)
  router.use('/producto', producto)
  // router.use('/factura/compra', compra)
  // router.use('/factura/venta', venta)
  // router.use('/cliente', cliente)
  // router.use('/pago', pago)
  // router.use('/init', init)
}

module.exports = routerAPI
