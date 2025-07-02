const express = require('express')
const { respuesta } = require('./funcion')
const { validatorHandler } = require('../middlewares/validatorHandler.js')

const router = express.Router()

const {
  cargarCompras,
  cargarCompraEstadoEntrega,
  cargarCompraEstadoPago
} = require('../servicios/compra/get.js')

const {
  crearFacturaCompra
} = require('../servicios/compra/post.js')
const { queryComprasSchema, crearCompraSchema } = require('../schemas/compra.js')
const { requireUser } = require('../middlewares/autenticationHandler.js')
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

router.get('/',
  requireUser,
  validatorHandler(queryComprasSchema, 'query', true),
  async (req, res) => {
    const {
      compra_id,
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
    const facturas = await cargarCompras({ idUsuario, compra_id, cliente_id, id_estado_entrega, id_estado_pago, fechaInicio, fechaFinal, columna, orden, offset, limit })
    res.json(respuesta('Facturas de compra cargadas', facturas))
  })

router.get('/estadoentrega',
  requireUser,
  async (req, res) => {
    const estados = await cargarCompraEstadoEntrega()
    res.json(respuesta('Estados de compra cargados', estados))
  })

router.get('/estadopago',
  requireUser,
  async (req, res) => {
    const estados = await cargarCompraEstadoPago()
    res.json(respuesta('Estados de compra cargados', estados))
  })

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

router.post('/',
  requireUser,
  validatorHandler(crearCompraSchema, 'body', true),
  async (req, res) => {
    const {
      info,
      detalles
    } = req.validated.body
    const { idUsuario } = req.usuario
    const factura = await crearFacturaCompra({ info, detalles, idUsuario })
    res.json(respuesta('Factura de compra creada', factura))
  })

module.exports = router
