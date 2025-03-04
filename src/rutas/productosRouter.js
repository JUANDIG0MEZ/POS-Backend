const express = require('express')
const { 
    cargarProductos,
    cargarProducto,
    cargarCategorias,
    cargarMarcas,
    cargarMedidas
} = require('../servicios/getProductos')

// const {
//     crearProducto,
//     modificarProducto
// } = require('../servicios/otherProductos')
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





// router.post('/', async (req, res)=> {
//     const body = req.body
//     try {
//         const producto = await crearProducto(body)
//         res.json({
//             message: 'Producto creado',
//             body: producto
//         })
//     }
//     catch (error) {
//         res.json({
//             message: 'Error al crear el producto',
//             error: error
//         })
//     }

// })


// router.patch('/:id', async (req, res)=> {
//     const {id} = req.params
//     const body = req.body
//     try {
//         const producto = await modificarProducto(id, body)
//         res.json({
//             message: 'Producto modificado',
//             body: producto
//         })
//     }
//     catch (error) {
//         res.json({
//             message: 'Error al modificar el producto',
//             error: error
//         })
//     }
// })



module.exports = router