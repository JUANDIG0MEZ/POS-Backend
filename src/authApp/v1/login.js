const { COOKIE_CONFIG } = require('../../config/cookie.js')
const { respuesta } = require('../../utils/respuestas.js')
const { validatorHandler } = require('../../middlewares/validatorHandler.js')
const { loginUserSchema } = require('../../schemas/auth/autenticacion.js')
const { autenticarUsuario, crearToken } = require('../../serviciosAuth/v1/index.js')

const express = require('express')
const router = express.Router()

router.post('/login',
  validatorHandler(loginUserSchema, 'body'),
  async (req, res) => {
    const { email, contrasenia } = req.validated.body
    const usuarioDB = await autenticarUsuario({ email, contrasenia })
    const token = crearToken({ idUsuario: usuarioDB.id })
    res.cookie('access_token', token, COOKIE_CONFIG)
    res.send(respuesta('Acceso generado'))
  })

module.exports = router
