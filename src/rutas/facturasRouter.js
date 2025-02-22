const express = require('express')
const {
    cargarFacturasCompra,
    cargarFacturasVenta,
    cargarFacturaCompra,
    cargarFacturaVenta    
} = require('../servicios/getFacturas') 
const router = express.Router()


router.get('/ventas/', async (req, res)=> {
    const facturas = await cargarFacturasVenta()
    res.send(facturas)
})

router.get('/ventas/:id', async (req, res)=> {
    const id = req.params.id
    const factura = await cargarFacturaVenta(id)
    res.send(factura)
})


router.get('/compras/', async (req, res)=> {
    const facturas = await cargarFacturasCompra()
    res.send(facturas)
})

router.get('/compras/:id', async (req, res)=> {
    const id = req.params.id 
    const factura = await cargarFacturaCompra(id)
    res.send(factura)
})


module.exports = router
