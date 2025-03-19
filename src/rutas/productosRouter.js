const express = require('express')
const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

const { 
    cargarProductos,
    cargarProducto,
    cargarCategorias,
    cargarMarcas,
    cargarMedidas,
    cargarImagenesProducto
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
    try {
        const categorias = await cargarCategorias()
        res.json({
            status: 'success',
            message: 'Categorias cargadas.',
            body: categorias
        })
    }
    catch {
        res.json({
            status: 'error',
            message: 'Error al cargar las categorias.',
            error: null
        })
    }
})

router.get('/medidas', async (req, res)=>{
    try {
        const medidas = await cargarMedidas()
        res.json({
            status: 'success',
            message: 'Medidas cargadas.',
            body: medidas
        })
    }
    catch {
        res.json({
            status: 'error',
            message: 'Error al cargar las medidas.',
            error: null
        })
    }
})

router.get('/marcas', async (req, res)=>{
    try {
        const marcas = await cargarMarcas()
        res.json({
            status: 'success',
            message: 'Marcas cargadas.',
            body: marcas
        })
    }
    catch {
        res.json({
            status: 'error',
            message: 'Error al cargar las marcas.',
            error: null
        })
    }
})

router.get('/:id', async (req, res)=>{
    const { id } = req.params
    const producto = await cargarProducto(id)
    res.send(producto)
})





router.post('/', upload.array("imagenes") ,async (req, res)=> {
    
    try {     
        const producto = await crearProducto(req)
        res.json({
            status: 'success',
            message: 'Producto creado',
            body: producto
        })
    }
    catch (error) {
        console.log(error)
        res.json({
            status: 'error',
            message: 'Error al crear el producto',
            error: error
        })
    }

})



router.get("/:id/imagenes", async (req, res) => {
    try {
        const { id } = req.params
        const imagenes = await cargarImagenesProducto(id)
        res.json({
            status: 'success',
            message: 'Imagenes cargadas.',
            body: imagenes
        })
    }
    catch (error) {
        res.json({
            status: 'error',
            message: 'Error al cargar las imagenes.',
            error: error
        })
    }
    
})


module.exports = router