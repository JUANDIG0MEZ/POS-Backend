const express = require('express')
const {
    cargarClientes,
    cargarCliente,
    cargarCompraCliente,
    cargarVentaCliente,
    cargarAbonosCliente,
    cargarPagosCliente

} = require('../servicios/getClientes')

const router = express.Router()

router.get('/', async (req, res)=>{
    const clientes = await cargarClientes()
    res.send(clientes)
})


// router.get('/tipos', (req, res)=>{
//     const tipos = tiposClientes()
//     res.send(tipos)
// })

router.get('/:id', async (req, res)=>{
    const { id } = req.params
    const cliente = await cargarCliente(id)
    res.send(cliente)
})


router.get('/:id/abonos', async (req, res)=>{
    const { id } = req.params
    const abonos = await cargarAbonosCliente(id)
    res.send(abonos)
})

router.get('/:id/pagos', async (req, res)=>{
    const { id } = req.params
    const pagos = await cargarPagosCliente(id)
    res.send(pagos)
})

router.get('/:id/compras', async (req, res)=>{
    const { id } = req.params
    const compras = await cargarCompraCliente(id)
    res.send(compras)
})

router.get('/:id/ventas', async (req, res)=>{
    const { id } = req.params
    const ventas = await cargarVentaCliente(id)
    res.send(ventas)
})

module.exports = router