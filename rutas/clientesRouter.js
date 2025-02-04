const express = require('express')
const {
    cargarClientes,
    tiposClientes, 
    cargarCliente, 
    clienteAbonos, 
    clientePagos, 
    clienteFacturaCompra, 
    clienteFacturaVenta
} = require('../servicios/obtenerDatos')

const router = express.Router()

router.get('/', (req, res)=>{
    res.send(cargarClientes())
})


router.get('/tipos', (req, res)=>{
    const tipos = tiposClientes()
    res.send(tipos)
})

router.get('/:id', (req, res)=>{
    const { id } = req.params
    const cliente = cargarCliente(id)
    res.send(cliente)
})


router.get('/:id/abonos', (req, res)=>{
    const abonos = clienteAbonos()
    res.send(abonos)
})

router.get('/:id/pagos', (req, res)=>{
    const pagos = clientePagos();
    res.send(pagos)
})

router.get('/:id/compras', (req, res)=>{
    const compras = clienteFacturaCompra()
    res.send(compras)
})

router.get('/:id/ventas', (req, res)=>{
    const ventas = clienteFacturaVenta()
    res.send(ventas)
})










module.exports = router