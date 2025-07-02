const express = require('express')
const { validatorHandler } = require('../middlewares/validatorHandler')
const { requireUser } = require('../middlewares/autenticationHandler')
// const {
//   cargarFacturasVenta,
//   cargarFacturaVenta
// } = require('../servicios/facturasVenta/getFacturaVenta')

const {
  cargarVentas,
  cargarVentaEstadoEntrega,
  cargarVentaEstadoPago
} = require('../servicios/venta/get.js')

// const {
//   crearFacturaVenta
// } = require('../servicios/facturasVenta/postFacturaVenta')

// const {
//   modificarVenta
// } = require('../servicios/facturasVenta/patchFacturaVenta')

// const {
//   crearAbonoFactura
// } = require('../servicios/clientes/postCliente')

const { respuesta } = require('./funcion')
const { queryVentasSchema } = require('../schemas/venta.js')

const router = express.Router()

router.get('/',
  requireUser,
  validatorHandler(queryVentasSchema, 'query', true),
  async (req, res) => {
    const {
      venta_id,
      cliente_id,
      estado_entrega_id,
      estado_pago_id,
      fechaInicio,
      fechaFinal,
      columna,
      orden,
      offset,
      limit
    } = req.validated.query
    const { idUsuario } = req.usuario
    const facturas = await cargarVentas({ idUsuario, venta_id, cliente_id, estado_entrega_id, estado_pago_id, fechaInicio, fechaFinal, columna, orden, offset, limit })
    res.json(respuesta('Facturas de venta cargadas', facturas))
  })

router.get('/estadoentrega',
  requireUser,
  async (req, res) => {
    const estados = await cargarVentaEstadoEntrega()
    res.json(respuesta('Estados de venta cargados', estados))
  })

router.get('/estadopago',
  requireUser,
  async (req, res) => {
    const estados = await cargarVentaEstadoPago()
    res.json(respuesta('Estados de venta cargados', estados))
  })

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

module.exports = router
