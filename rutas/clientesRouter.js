const express = require('express')
const { cargarClientes, tiposClientes} = require('../servicios/obtenerDatos')

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
    const clientes = cargarClientes()
    const cliente = clientes.find(cliente => cliente.id == id)
    res.send(cliente)
})







module.exports = router