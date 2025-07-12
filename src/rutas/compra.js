const express = require('express')
const { respuesta } = require('./funcion')
const { validatorHandler } = require('../middlewares/validatorHandler.js')

const router = express.Router()

const {
  cargarCompras,
  cargarCompraEstadoEntrega,
  cargarCompraEstadoPago,
  cargarCompra
} = require('../servicios/compra/get.js')

const {
  modificarCompra,
  modificarEstadoEntregaCompra
} = require('../servicios/compra/patch.js')

const {
  crearFacturaCompra
} = require('../servicios/compra/post.js')
const { queryComprasSchema, crearCompraSchema, modificarDetallesSchema, modificarIdEstadoEntregaCompra } = require('../schemas/compra.js')
const { requireUser } = require('../middlewares/autenticationHandler.js')

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

router.get('/:id',
  requireUser,
  async (req, res) => {
    const compra_id = req.params.id
    const { idUsuario } = req.usuario
    const factura = await cargarCompra({ idUsuario, compra_id })
    res.send(respuesta('Factura de compra cargada', factura))
  })

router.patch('/:id/estado-entrega',
  requireUser,
  validatorHandler(modificarIdEstadoEntregaCompra, 'body'),
  async (req, res) => {
    const {
      id_estado_entrega
    } = req.validated.body

    const { idUsuario } = req.usuario
    const { id } = req.params
    const estado = await modificarEstadoEntregaCompra({ idUsuario, compra_id: id, id_estado_entrega })
    res.json(respuesta('Estado de la entrega ha sido modificada', estado))
  }
)

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
