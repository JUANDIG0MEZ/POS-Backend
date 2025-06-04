const express = require('express')
const {
    cargarDatosIniciales
} = require('../servicios/init')
const { respuesta } = require('./funciones')

const router = express.Router()


router.get('/', async (req, res, next)=> {
    try {
        const datosIniciales = await cargarDatosIniciales()

        res.json(respuesta("Datos iniciales cargados", datosIniciales))
    }

    catch (error) {
        next(error)
    }
})




module.exports = router