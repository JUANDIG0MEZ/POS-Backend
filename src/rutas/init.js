const express = require('express')

const {
  cargarMetodosPago
} = require('../servicios/init/get.js')
const { respuesta } = require('./funcion')
const { requireUser } = require('../middlewares/autenticationHandler')

const router = express.Router()

router.get('/metodopago',
  requireUser,
  async (req, res) => {
    const metodosPago = await cargarMetodosPago()
    res.json(respuesta('Metodos pago cargados', metodosPago))
  }
)

module.exports = router
