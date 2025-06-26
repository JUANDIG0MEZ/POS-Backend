// const express = require('express')
// const { respuesta } = require('./funciones')
// const { validatorHandler } = require('../middlewares/validatorHandler.js')
// const {
//   cargarFacturasCompra,
//   cargarFacturaCompra,
//   cargarEstadosComprasEntrega,
//   cargarEstadosComprasPago
// } = require('../servicios/facturasCompra/getFacturaCompra')

// const {
//   modificarCompra
// } = require('../servicios/facturasCompra/patchFacturaCompra')

// const {
//   crearFacturaCompra
// } = require('../servicios/facturasCompra/postFacturaCompra')

// const router = express.Router()

// router.get('/',
//   async (req, res) => {
//     const facturas = await cargarFacturasCompra(req.query)
//     res.json(respuesta('Facturas de compra cargadas', facturas))
//   })

// router.get('estados/entrega',
//   async (req, res) => {
//     const estados = await cargarEstadosComprasEntrega()
//     res.json(respuesta('Estados de compra cargados', estados))
//   })

// router.get('/estados/pago',
//   async (req, res) => {
//     const estados = await cargarEstadosComprasPago()
//     res.json(respuesta('Estados de compra cargados', estados))
//   })

// router.get('/:id',
//   async (req, res) => {
//     const id = req.params.id
//     const factura = await cargarFacturaCompra(id)
//     res.send(respuesta('Factura de compra cargada', factura))
//   })

// router.patch('/:id',
//   async (req, res) => {
//     const body = req.body
//     const id = req.params.id
//     const factura = await modificarCompra(body, id)
//     res.json(respuesta('Factura de compra modificada', factura))
//   })

// router.post('/',
//   async (req, res) => {
//     const body = req.body
//     const factura = await crearFacturaCompra(body)
//     res.json(respuesta('Factura de compra creada', factura))
//   })

// module.exports = router
