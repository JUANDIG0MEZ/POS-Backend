const express = require('express')
// const {
//   cargarDatosIniciales
// } = require('../servicios/init')

const {
  cargarMetodosPago
} = require('../servicios/init/get.js')
const { respuesta } = require('./funcion')
const { requireUser } = require('../middlewares/autenticationHandler')

const router = express.Router()

// router.get('/',
//   requireUser,
//   async (req, res) => {
//     const { idUsuario } = req.usuario
//     const datosIniciales = await cargarDatosIniciales(idUsuario)
//     res.json(respuesta('Datos iniciales cargados', datosIniciales))
//   })

router.get('/metodopago',
  requireUser,
  async (req, res) => {
    const metodosPago = await cargarMetodosPago()
    res.json(respuesta('Metodos pago cargados', metodosPago))
  }
)

module.exports = router
