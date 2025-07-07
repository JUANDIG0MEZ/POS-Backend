const express = require('express')
const autenticacion = require('./autenticacion.js')
const producto = require('./producto.js')
const { requireUser } = require('../middlewares/autenticationHandler.js')
const cliente = require('./cliente.js')
const compra = require('./compra.js')
const venta = require('./venta.js')
const init = require('./init.js')
const pago = require('./pago')
const abono = require('./abono.js')

function routerAPI (app) {
  const router = express.Router()
  app.use('/api/v1', router)

  router.use('/autenticacion', autenticacion)
  app.use(requireUser)
  router.use('/init', init)
  router.use('/producto', producto)
  router.use('/compra', compra)
  router.use('/venta', venta)
  router.use('/cliente', cliente)
  router.use('/pago', pago)
  router.use('/abono', abono)
}

module.exports = routerAPI
