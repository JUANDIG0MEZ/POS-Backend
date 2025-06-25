const express = require('express')
const { respuesta } = require('./funciones')
const { validatorHandler } = require('../middlewares/validatorHandler')
const { crearAbonoVenta, crearAbonoVentas } = require('../servicios/clientes/postCliente')
const { crearAbonoVentaSchema, crearAbonoClienteSchema, queryAbonosSchema, paramsAbonosSchema } = require('../schemas/abonos')

const router = express.Router()

router.get('/',
  validatorHandler(queryAbonosSchema, 'query'),
  validatorHandler(paramsAbonosSchema, 'params'),
  async (req, res) => {
    const { usuarioId } = req.usuario
    const data = await obtenerAbonos()
    res.json(respuesta('Pago realizado', data))
  }
)

router.post('/venta',
  validatorHandler(crearAbonoVentaSchema, 'body'),
  async (req, res) => {
    const { usuarioId } = req.usuario
    const data = await crearAbonoVenta(req.body, usuarioId)
    res.json(respuesta('Pago realizado', data))
  })

router.post('/cliente',
  validatorHandler(crearAbonoClienteSchema, 'body'),
  async (req, res) => {
    const { usuarioId } = req.usuario
    const data = await crearAbonoVentas(req.body, usuarioId)
    res.json(respuesta('Pago realizado', data))
  }
)

module.exports = router
