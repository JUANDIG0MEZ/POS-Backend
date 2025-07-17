const express = require('express')
const { respuesta } = require('../../utils/respuestas.js')
const { validatorHandler } = require('../../middlewares/validatorHandler.js')
const { crearAbonoVenta, crearAbonoCliente } = require('../../servicios/abono/post.js')
const { crearAbonoVentaSchema, crearAbonoClienteSchema } = require('../../schemas/api/abonos.js')
const { requireUser } = require('../../middlewares/autenticationHandler.js')
const router = express.Router()

router.post('/venta',
  requireUser,
  validatorHandler(crearAbonoVentaSchema, 'body'),
  async (req, res) => {
    const {
      venta_id,
      id_metodo_pago,
      valor,
      descripcion
    } = req.validated.body
    const { idUsuario } = req.usuario
    const data = await crearAbonoVenta({ idUsuario, venta_id }, { id_metodo_pago, valor, descripcion })
    res.json(respuesta('Abono realizado', data))
  })

router.post('/cliente',
  requireUser,
  validatorHandler(crearAbonoClienteSchema, 'body'),
  async (req, res) => {
    const {
      cliente_id,
      id_metodo_pago,
      valor,
      descripcion
    } = req.validated.body
    const { idUsuario } = req.usuario
    const data = await crearAbonoCliente({ idUsuario, cliente_id }, { id_metodo_pago, valor, descripcion })
    res.json(respuesta('Pago realizado', data))
  }
)

module.exports = router
