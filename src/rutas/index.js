const express = require('express')
const producto = require('./producto.js')
const cliente = require('./cliente.js')
const compra = require('./compra.js')
const venta = require('./venta.js')
const autenticacion = require('./autenticacion.js')
const pago = require('./pago')
const init = require('./init')

function routerAPI (app) {
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/producto', producto)
  router.use('/factura/compra', compra)
  router.use('/factura/venta', venta)
  router.use('/cliente', cliente)
  router.use('/pago', pago)
  router.use('/init', init)
  router.use('/autenticacion', autenticacion)
}

module.exports = routerAPI
