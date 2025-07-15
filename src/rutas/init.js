const express = require('express')

const {
  cargarMetodosPago,
  cargarConfiguracion
} = require('../servicios/init/get.js')
const { respuesta } = require('./funcion')
const { requireUser } = require('../middlewares/autenticationHandler')

const router = express.Router()

router.get('/metodo-pago',
  requireUser,
  async (req, res) => {
    const metodosPago = await cargarMetodosPago()
    res.json(respuesta('Metodos pago cargados', metodosPago))
  }
)

router.get('/configuracion',
  requireUser,
  async (req, res) => {
    const usuario = req.usuario
    const configuracion = await cargarConfiguracion({ usuario })
    res.json(respuesta('Cargar configuracion', configuracion))
  }
)

module.exports = router
