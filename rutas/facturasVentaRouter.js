const express = require('express')
const { cargarFacturasVenta, facturaVenta } = require('../servicios/obtenerDatos')

const router = express.Router()

router.get('/', (req, res)=> {
    res.send(cargarFacturasVenta())
})

router.get('/:id', (req, res)=> {
    const id = req.params.id
    res.send(facturaVenta(id))
})

module.exports = router