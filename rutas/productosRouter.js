const express = require('express')
const { cargarProductos, cargarCategorias, cargarMedidas, cargarMarcas } = require('../servicios/obtenerDatos')
const router = express.Router()


router.get('/', (req, res)=>{
    res.send(cargarProductos())
})


router.get('/categorias', (req, res)=>{
    res.send(cargarCategorias())
})

router.get('/medidas', (req, res)=>{
    res.send(cargarMedidas())
})

router.get('/marcas', (req, res)=>{
    res.send(cargarMarcas())
})

router.get('/:id', (req, res)=>{
    const { id } = req.params
    const productos = cargarProductos()
    const producto = productos.find(producto => producto.id == id)
    res.send(producto)
    
})






module.exports = router