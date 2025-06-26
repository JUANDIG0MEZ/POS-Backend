const express = require('express')
const jwt = require('jsonwebtoken')
const { validatorHandler } = require('../middlewares/validatorHandler')
const { accesoUsuariosSchema, crearUsuarioSchema, verificarUsuarioSchema } = require('../schemas/autenticacion')
const router = express.Router()
const { autenticarUsuario } = require('../servicios/autenticacion/get.js')
const { crearToken, crearUsuario, verificarUsuario } = require('../servicios/autenticacion/post.js')
const { respuesta } = require('./funcion.js')

const COOKIE_CONFIG = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'Lax',
  maxAge: 2 * 60 * 60 * 1000
}

const LOGOUT_COOKIE_CONFIG = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'Lax'
}

router.post('/registrar',
  validatorHandler(crearUsuarioSchema, 'body'),
  async (req, res) => {
    console.log(req.body)
    const { email, contrasenia } = req.body
    await crearUsuario({ email, contrasenia })
    res.send(respuesta('Usuario creado'))
  })

router.post('/verificar',
  validatorHandler(verificarUsuarioSchema, 'body'),
  async (req, res) => {
    const { email, codigoVerificacion } = req.body
    const usuario = await verificarUsuario({ email, codigoVerificacion })
    const token = await crearToken({ usuario_id: usuario.id })
    res.cookie('access_token', token, COOKIE_CONFIG)
    res.send(respuesta('Usuario verificado.'))
  }
)

router.post('/ingresar',
  validatorHandler(accesoUsuariosSchema, 'body'),
  async (req, res) => {
    const { email, contrasenia } = req.body
    const usuarioDB = await autenticarUsuario({ email, contrasenia })
    const token = crearToken({ usuario_id: usuarioDB.id })
    res.cookie('access_token', token, COOKIE_CONFIG)
    res.send(respuesta('Acceso generado'))
  })

router.post('/logout', (req, res) => {
  res.clearCookie('access_token', LOGOUT_COOKIE_CONFIG)
  res.send(respuesta('Sesion cerrada correctamente'))
})

module.exports = router
