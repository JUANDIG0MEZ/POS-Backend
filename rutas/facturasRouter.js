const express = require('express')
const { cargarFacturasCompra, facturaCompra, cargarFacturasVenta, facturaVenta } = require('../servicios/obtenerDatos') 
const router = express.Router()




router.get('/cliente/:id', (req, res)=>{
    const { id } = req.params
    res.send(`Estas en facturas ${id}`)

})

router.get('/cliente/:id/compras', (req, res)=>{
    const { id } = req.params
    res.send(`Estas en facturas de compra ${id}`)

})

router.get('/cliente/:id/ventas', (req, res)=>{
    const { id } = req.params
    res.send(`facturas de ventas ${id}`)

})


router.get('/venta/', (req, res)=> {
    res.send(cargarFacturasCompra())
})

router.get('/venta/:id', (req, res)=> {
    const { id } = req.params
    const factura = facturaCompra(id)
    res.send(factura)
})


router.get('/compra/', (req, res)=> {
    res.send(cargarFacturasVenta())
})

router.get('/compra/:id', (req, res)=> {
    const id = req.params.id
    res.send(facturaVenta(id))
})


module.exports = router
