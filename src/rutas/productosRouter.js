const express = require('express')
const { 
    cargarProductos,
    cargarProducto,
    cargarCategorias,
    cargarMarcas,
    cargarMedidas
} = require('../servicios/getProductos')

const {
    crearProducto,
    modificarProducto
} = require('../servicios/otherProductos')
const router = express.Router()


router.get('/', async (req, res)=>{
    try {
        const productos = await cargarProductos()
        res.json({
            status: 'success',
            message: 'Productos cargados.',
            body: productos
        })
    }
    catch {
        res.json({
            status: 'error',
            message: 'Error al cargar los productos.',
            error: null
        })
    }
})

router.get('/categorias', async (req, res)=>{
    const categorias = await cargarCategorias()
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



router.post('/', async (req, res)=> {
    
    try {     
        const body = req.body
        const producto = await crearProducto(body)
        res.json({
            status: 'success',
            message: 'Producto creado',
            body: producto
        })
    }
    catch (error) {
        res.json({
            status: 'error',
            message: 'Error al crear el producto',
            data: null
        })
    }

})


router.patch('/', async (req, res)=> {

    try {
        const body = req.body
        const producto = await modificarProducto(body)
        res.json({
            status: "success",
            message: 'Producto modificado',
            data: producto
        })
    }
    catch {
        res.json({
            status: "error",
            message: 'Error al modificar el producto',
            data: null
        })
    }
})



module.exports = router