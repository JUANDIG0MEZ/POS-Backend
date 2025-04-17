const express = require('express')
const multer = require('multer')
const {v4: uuidv4} = require('uuid')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${uuidv4()}${path.extname(file.originalname)}`)
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
    //modificarProducto
} = require('../servicios/otherProductos')
const { respuesta } = require('./funciones')
const router = express.Router()


router.get('/', async (req, res, next)=>{
    try {
        const productos = await cargarProductos()
        res.json(respuesta  ('Productos cargados', productos))
    }
    catch(error) {
        next(error)
    }
})

router.get('/categorias', async (req, res, next)=>{
    try {
        const categorias = await cargarCategorias()
        res.json(respuesta('Categorias cargadas', categorias))
    }
    catch(error) {
        next(error)
    }
})

router.get('/medidas', async (req, res, next)=>{
    try {
        const medidas = await cargarMedidas()
        res.json(respuesta('Medidas cargadas', medidas))
    }
    catch (error) {
        next(error)
    }
})

router.get('/marcas', async (req, res, next)=>{
    try {
        const marcas = await cargarMarcas()
        res.json(respuesta('Marcas cargadas', marcas))
    }
    catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next)=>{
    try {
        const { id } = req.params
        const producto = await cargarProducto(id)
        res.send(producto)
    }
    catch (error) {
        next(error)
    }
    
})

router.get("/:id/imagenes", async (req, res, next) => {
    try {
        const { id } = req.params
        const imagenes = await cargarImagenesProducto(id)
        res.json(respuesta('Imagenes cargadas', imagenes))
    }
    catch (error) {
        next(error)
    }
    
})


router.post('/', upload.array("files", 10) ,async (req, res, next)=> {
    try {     
        const producto = await crearProducto(req)
        res.json(respuesta('Producto creado', producto))
    }
    catch (error) {
        next(error)
    }

})


module.exports = router