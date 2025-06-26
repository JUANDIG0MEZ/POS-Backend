// const express = require('express')
// const { validatorHandler } = require('../middlewares/validatorHandler')

// const {
//   cargarFacturasVenta,
//   cargarFacturaVenta
// } = require('../servicios/facturasVenta/getFacturaVenta')

// const {
//   crearFacturaVenta
// } = require('../servicios/facturasVenta/postFacturaVenta')

// const {
//   modificarVenta
// } = require('../servicios/facturasVenta/patchFacturaVenta')

// const {
//   crearAbonoFactura
// } = require('../servicios/clientes/postCliente')

// const { respuesta } = require('./funciones')

// const router = express.Router()

// router.get('/',
//   validatorHandler(),
//   async (req, res) => {
//     const facturas = await cargarFacturasVenta(req.query)
//     res.json(respuesta('Facturas de venta cargadas', facturas))
//   })

// router.get('/:id', async (req, res, next) => {
//   const id = req.params.id
//   const factura = await cargarFacturaVenta(id)
//   res.json(respuesta('Factura de venta cargada', factura))
// })

// router.patch('/:id', async (req, res, next) => {
//   const id = req.params.id
//   const body = req.body
//   const factura = await modificarVenta(body, id)
//   res.json(respuesta('Factura de venta modificada', factura))
// })

// router.post('/', async (req, res, next) => {
//   const body = req.body
//   const factura = await crearFacturaVenta(body)
//   res.json(respuesta('Factura de venta creada', factura))
// })

// router.patch('/:id/abonar', async (req, res, next) => {
//   const id = req.params.id
//   const body = req.body
//   const abono = await crearAbonoFactura(body, id)
//   res.json(respuesta('Abono realizado', abono))
// })

// module.exports = router
