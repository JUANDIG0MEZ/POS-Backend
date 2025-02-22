const express = require('express')
const { 
    cargarProductos,
    cargarProducto,
    cargarCategorias,
    cargarMarcas,
    cargarMedidas
} = require('../servicios/getProductos')
const router = express.Router()


router.get('/', async (req, res)=>{
    const productos = await cargarProductos()
    res.send(productos)
})


router.get('/categorias', async (req, res)=>{
    const categorias = await cargarCategorias()
    console.log(categorias)
    res.send(categorias)
})

router.get('/medidas', async (req, res)=>{
    const medidas = await cargarMedidas()
    res.send(medidas)
})

router.get('/marcas', async (req, res)=>{
    const marcas = await cargarMarcas()
    res.send(marcas)
})

router.get('/:id', async (req, res)=>{
    const { id } = req.params
    const producto = await cargarProducto(id)
    res.send(producto)
})



module.exports = router