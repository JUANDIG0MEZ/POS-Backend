const express = require('express')
const { facturaCompra, cargarFacturasCompra } = require('../servicios/obtenerDatos')

const router = express.Router()

router.get('/', (req, res)=> {
    res.send(cargarFacturasCompra())
})

router.get('/:id', (req, res)=> {
    const { id } = req.params
    const factura = facturaCompra(id)
    res.send(factura)
})

module.exports = router