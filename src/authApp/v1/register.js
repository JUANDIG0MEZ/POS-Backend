const { registerUser } = require('../../serviciosAuth/v1/index.js')
const { respuesta } = require('../../utils/respuestas.js')

const express = require('express')
const router = express.Router()

router.post('/',
  async (req, res) => {
    const { email } = req.body
    await registerUser({ email })
    res.send(respuesta('Usuario creado'))
  })

module.exports = router
