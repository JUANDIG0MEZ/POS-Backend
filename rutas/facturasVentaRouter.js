const express = require('express')
const { cargarFacturasVenta } = require('../servicios/obtenerDatos')

const router = express.Router()

router.get('/', (req, res)=> {
    res.send(cargarFacturasVenta())
})

router.get('/:id', (req, res)=> {
    const { id } = req.params
    const facturas = cargarFacturasVenta()
    const factura = facturas.find(factura => factura.id == id)
    res.send(factura)
})

module.exports = router