const express = require('express')
const router = express.Router()
const { validatorHandler } = require('../../middlewares/validatorHandler.js')
const { confirmUsuarioSchema } = require('../../schemas/auth/autenticacion.js')
const { confirmarUsuario, crearToken } = require('../../serviciosAuth/v1/index.js')
const { respuesta } = require
const { COOKIE_CONFIG } = require('../../config/cookie.js')

router.post('/confirm',
  validatorHandler(confirmUsuarioSchema, 'body'),
  async (req, res) => {
    const { email, codigoVerificacion } = req.validated.body
    const usuario = await confirmarUsuario({ email, codigoVerificacion })
    const token = await crearToken({ idUsuario: usuario.id })
    res.cookie('access_token', token, COOKIE_CONFIG)
    res.send(respuesta('Usuario verificado.'))
  }
)

module.exports = router
