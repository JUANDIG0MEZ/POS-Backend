const express = require('express')
const { validatorHandler } = require('../middlewares/validatorHandler')
const { requireUser } = require('../middlewares/autenticationHandler')

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
  modificarDetalleVenta,
  modificarEstadoEntregaVenta
} = require('../servicios/venta/patch.js')

const { respuesta } = require('./funcion')
const { queryVentasSchema, crearVentaSchema, modificarDetallesVentaSchema, modificarIdEstadoEntregaVenta } = require('../schemas/venta.js')

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

router.patch('/:id/estado-entrega',
  requireUser,
  validatorHandler(modificarIdEstadoEntregaVenta, 'body'),
  async (req, res) => {
    const {
      id_estado_entrega
    } = req.validated.body
    const { idUsuario } = req.usuario
    const { id } = req.params
    const estado = await modificarEstadoEntregaVenta({ idUsuario, venta_id: id, id_estado_entrega })
    res.json(respuesta('Estado de la entrega ha sido modificada', estado))
  }
)

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

module.exports = router
