const { COOKIE_CONFIG } = require('../../config/cookie.js')
const { respuesta } = require('../../utils/respuestas.js')
const { autenticarUsuario } = require('../../serviciosAuth/v1/index.js')

const express = require('express')
const router = express.Router()

router.post('/',
  async (req, res) => {
    const { email, contrasenia } = req.body
    const tokenSesion = await autenticarUsuario({ email, contrasenia })
    res.cookie('access_token', tokenSesion, COOKIE_CONFIG)
    res.send(respuesta('Acceso generado'))
  })

module.exports = router
