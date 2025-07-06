const express = require('express')
const { respuesta } = require('./funciones')
const { validatorHandler } = require('../middlewares/validatorHandler')
const { crearAbonoVenta, crearAbonoVentas } = require('../servicios/abono/post.js')
const { crearAbonoVentaSchema, crearAbonoClienteSchema, queryAbonosSchema, paramsAbonosSchema } = require('../schemas/abonos')
const { requireUser } = require('../middlewares/autenticationHandler.js')
const router = express.Router()

// router.get('/',
//   validatorHandler(queryAbonosSchema, 'query'),
//   validatorHandler(paramsAbonosSchema, 'params'),
//   async (req, res) => {
//     const { idUsuario } = req.usuario
//     const data = await obtenerAbonos()
//     res.json(respuesta('Pago realizado', data))
//   }
// )

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
  validatorHandler(crearAbonoClienteSchema, 'body'),
  async (req, res) => {
    const { idUsuario } = req.usuario
    const data = await crearAbonoVentas(req.body, idUsuario)
    res.json(respuesta('Pago realizado', data))
  }
)

module.exports = router
