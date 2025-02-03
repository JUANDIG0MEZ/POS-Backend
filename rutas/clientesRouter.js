const express = require('express')
const { cargarClientes, tiposClientes, cargarCliente} = require('../servicios/obtenerDatos')

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







module.exports = router