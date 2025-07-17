const { validatorHandler } = require('../../middlewares/validatorHandler.js')
const { registerUserSchema } = require('../../schemas/auth/autenticacion.js')
const { crearUsuario } = require('../../serviciosAuth/v1/index.js')
const { respuesta } = require('../../utils/respuestas.js')

const express = require('express')
const router = express.Router()

router.post('/register',
  validatorHandler(registerUserSchema, 'body'),
  async (req, res) => {
    const { email, contrasenia } = req.validated.body
    await crearUsuario({ email, contrasenia })
    res.send(respuesta('Usuario creado'))
  })

module.exports = router
