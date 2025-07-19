const { respuesta } = require('../../utils/respuestas.js')

const express = require('express')
const router = express.Router()
const { COOKIE_CONFIG } = require('../../config/cookie.js')

router.post('/', (req, res) => {
  res.clearCookie('access_token', COOKIE_CONFIG)
  res.send(respuesta('Sesion cerrada correctamente'))
})

module.exports = router
