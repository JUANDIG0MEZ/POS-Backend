const express = require('express')
const { validatorHandler } = require('../middlewares/validatorHandler')
const { requireUser } = require('../middlewares/autenticationHandler')
// const {
//   cargarFacturasVenta,
//   cargarFacturaVenta
// } = require('../servicios/facturasVenta/getFacturaVenta')

const {
  cargarVentaEstadoEntrega,
  cargarVentaEstadoPago,
  cargarVentas,
  cargarVenta
} = require('../servicios/venta/get.js')

const {
  crearVenta
} = require('../servicios/venta/post.js')

const {
  modificarDetalleVenta
} = require('../servicios/venta/patch.js')

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
const { queryVentasSchema, crearVentaSchema, modificarDetallesVentaSchema } = require('../schemas/venta.js')

const router = express.Router()

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

router.get('/',
  requireUser,
  validatorHandler(queryVentasSchema, 'query', true),
  async (req, res) => {
    const {
      venta_id,
      cliente_id,
      id_estado_entrega,
      id_estado_pago,
      fechaInicio,
      fechaFinal,
      columna,
      orden,
      offset,
      limit
    } = req.validated.query
    const { idUsuario } = req.usuario
    console.log('querys de ventas', req.validated.query)
    const facturas = await cargarVentas({ idUsuario, venta_id, cliente_id, id_estado_entrega, id_estado_pago, fechaInicio, fechaFinal, columna, orden, offset, limit })
    res.json(respuesta('Facturas de venta cargadas', facturas))
  })

router.get('/:id',
  requireUser,
  async (req, res) => {
    const { idUsuario } = req.usuario
    const { id } = req.params
    const factura = await cargarVenta({ idUsuario, venta_id: id })
    res.json(respuesta('Factura de venta cargada', factura))
  })

router.patch('/:id/detalle',
  requireUser,
  validatorHandler(modificarDetallesVentaSchema, 'body'),
  async (req, res) => {
    const { detalles } = req.validated.body
    const id = req.params.id
    const { idUsuario } = req.usuario
    const factura = await modificarDetalleVenta({ idUsuario, venta_id: id, detalles })
    res.json(respuesta('Factura de venta modificada', factura))
  })

router.post('/',
  requireUser,
  validatorHandler(crearVentaSchema, 'body'),
  async (req, res) => {
    const {
      info,
      detalles
    } = req.validated.body
    const { idUsuario } = req.usuario
    const factura = await crearVenta({ idUsuario, info, detalles })
    res.json(respuesta('Factura de venta creada', factura))
  })

// router.patch('/:id/abonar', async (req, res, next) => {
//   const id = req.params.id
//   const body = req.body
//   const abono = await crearAbonoFactura(body, id)
//   res.json(respuesta('Abono realizado', abono))
// })

module.exports = router
