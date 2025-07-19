const express = require('express')
const router = express.Router()
const { confirmUser } = require('../../serviciosAuth/v1/index.js')
const { respuesta } = require('../../utils/respuestas.js')

router.post('/',
  async (req, res) => {
    const { contrasenia, token } = req.body
    await confirmUser({ token, contrasenia })
    res.send(respuesta('Usuario confirmado.'))
  }
)

module.exports = router
