const express = require('express')
const { respuesta } = require('../../utils/respuestas.js')
const { crearPagoCompraSchema, crearPagoClienteSchema } = require('../../schemas/api/pagos.js')
const { validatorHandler } = require('../../middlewares/validatorHandler.js')
const { requireUser } = require('../../middlewares/autenticationHandler.js')
const {
  crearPagoCompra,
  crearPagoCliente
} = require('../../servicios/pago/post.js')

const router = express.Router()

router.post('/compra',
  requireUser,
  validatorHandler(crearPagoCompraSchema, 'body'),
  async (req, res) => {
    const {
      compra_id,
      valor,
      id_metodo_pago,
      descripcion
    } = req.validated.body
    const { idUsuario } = req.usuario
    const data = await crearPagoCompra({ idUsuario, compra_id }, { id_metodo_pago, valor, descripcion })
    res.json(respuesta('Pago realizado', data))
  })

router.post('/cliente',
  requireUser,
  validatorHandler(crearPagoClienteSchema, 'body'),
  async (req, res) => {
    const { idUsuario } = req.usuario
    const {
      cliente_id,
      valor,
      id_metodo_pago,
      descripcion
    } = req.validated.body
    const data = await crearPagoCliente({ idUsuario, cliente_id }, { id_metodo_pago, valor, descripcion })
    res.json(respuesta('Pago realizado', data))
  }
)

module.exports = router
