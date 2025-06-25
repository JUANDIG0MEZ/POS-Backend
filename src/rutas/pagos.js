const express = require('express')
const { respuesta } = require('./funciones')
const { crearPagoCompraSchema, crearPagoClienteSchema, queryPagosSchema, paramsPagosSchema } = require('../schemas/pagos')
const { validatorHandler } = require('../middlewares/validatorHandler')
const { crearPagoCompra, crearPagoCompras } = require('../servicios/clientes/postCliente')
const { cargarPagosCliente } = require('../servicios/clientes/getCliente')

const router = express.Router()

router.get('/',
  validatorHandler(queryPagosSchema, 'query'),
  validatorHandler(paramsPagosSchema, 'params'),
  async (req, res) => {
    const data = await cargarPagosCliente()
    res.json(respuesta('Pagos cargados.', data))
  }
)

router.post('/compra',
  validatorHandler(crearPagoCompraSchema, 'body'),
  async (req, res) => {
    const { usuarioId } = req.usuario
    const data = await crearPagoCompra(req.body, usuarioId)
    res.json(respuesta('Pago realizado', data))
  })

router.post('/cliente',
  validatorHandler(crearPagoClienteSchema, 'body'),
  async (req, res) => {
    const { usuarioId } = req.usuario
    const data = await crearPagoCompras(req.body, usuarioId)
    res.json(respuesta('Pago realizado', data))
  }
)

module.exports = router
