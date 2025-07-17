const express = require('express')
const producto = require('./producto.js')
const { requireUser } = require('../../middlewares/autenticationHandler.js')
const cliente = require('./cliente.js')
const compra = require('./compra.js')
const venta = require('./venta.js')
const init = require('./init.js')
const pago = require('./pago.js')
const abono = require('./abono.js')

const apiApp = express()

// Middlewares
apiApp.use(express.json())
apiApp.use(requireUser)

const rutasv1 = express.Router()
rutasv1.use('/init', init)
rutasv1.use('/producto', producto)
rutasv1.use('/compra', compra)
rutasv1.use('/venta', venta)
rutasv1.use('/cliente', cliente)
rutasv1.use('/pago', pago)
rutasv1.use('/abono', abono)

apiApp.use('/v1', rutasv1)

module.exports = apiApp
