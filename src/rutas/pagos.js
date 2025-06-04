const express = require('express')
const {
    respuesta
} = require('./funciones')


const {
    MetodoPago
} = require('../database/models')


const router = express.Router()



router.get('/metodos', async (req, res, next )=> {
    try {
        const metodosPago = await MetodoPago.findAll()
        res.json(respuesta('Metodos de pago cargados', metodosPago))
    }
    catch (error) {
        next(error)
    }
})



module.exports = router