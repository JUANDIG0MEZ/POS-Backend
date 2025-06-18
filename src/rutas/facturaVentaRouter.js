const express = require('express')

const {
  cargarFacturasVenta,
  cargarFacturaVenta
} = require('../servicios/facturasVenta/getFacturaVenta')

const {
  crearFacturaVenta
} = require('../servicios/facturasVenta/postFacturaVenta')

const {
  modificarVenta
} = require('../servicios/facturasVenta/patchFacturaVenta')

const { respuesta } = require('./funciones')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const facturas = await cargarFacturasVenta(req.query)
    res.json(respuesta('Facturas de venta cargadas', facturas))
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const factura = await cargarFacturaVenta(id)
    res.json(respuesta('Factura de venta cargada', factura))
  } catch (error) {
    next(error)
  }
})

router.patch('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const body = req.body
    const factura = await modificarVenta(body, id)
    res.json(respuesta('Factura de venta modificada', factura))
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const body = req.body
    const factura = await crearFacturaVenta(body)
    res.json(respuesta('Factura de venta creada', factura))
  } catch (error) {
    next(error)
  }
})

// router.patch('/:id/abonar', async (req, res, next) => {
//   try {
//     const id = req.params.id
//     const body = req.body
//     const abono = await crearAbonoFactura(body, id)
//     res.json(respuesta('Abono realizado', abono))
//   } catch (error) {
//     next(error)
//   }
// })

module.exports = router
