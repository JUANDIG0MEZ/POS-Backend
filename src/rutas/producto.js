const { crearProducto, crearCategoria } = require('../servicios/producto/post.js')

const {
  crearProductoSchema,
  crearCategoriaSchema
} = require('../schemas/producto')
const { validatorHandler } = require('../middlewares/validatorHandler')

const { respuesta } = require('./funcion.js')

const express = require('express')
const { cargarProductos, cargarCategorias, cargarMedidas } = require('../servicios/producto/get')
const { requireUser } = require('../middlewares/autenticationHandler')

const router = express.Router()

router.get('/',
  requireUser,
  async (req, res) => {
    const { idUsuario } = req.usuario
    const productos = await cargarProductos({ idUsuario })
    res.json(respuesta('Producto cargados', productos))
  })

router.get('/categoria',
  requireUser,
  async (req, res) => {
    const { idUsuario } = req.usuario
    const categorias = await cargarCategorias({ idUsuario })
    res.json(respuesta('Categorias cargadas', categorias))
  })

router.get('/medida',
  async (req, res) => {
    const medidas = await cargarMedidas()
    res.json(respuesta('Medidas cargadas', medidas))
  }
)

router.post('/',
  requireUser,
  validatorHandler(crearProductoSchema, 'body'),
  async (req, res) => {
    const { idUsuario } = req.usuario
    const {
      nombre,
      categoria_id,
      id_medida,
      precio_compra,
      precio_venta,
      cantidad
    } = req.validated.body
    const producto = await crearProducto({ idUsuario, nombre, categoria_id, id_medida, precio_compra, precio_venta, cantidad })
    res.json(respuesta('Producto creado', producto))
  })

router.post('/categoria',
  requireUser,
  validatorHandler(crearCategoriaSchema, 'body'),
  async (req, res) => {
    const { idUsuario } = req.usuario
    const {
      nombre,
      descripcion
    } = req.validated.body
    const categoria = await crearCategoria({ idUsuario, nombre, descripcion })
    res.json(respuesta('Categoria creada', categoria))
  })

// router.patch('/:id',
//   validatorHandler(actualizarProductoSchema, 'body'),
//   async (req, res) => {
//     const { id } = req.params
//     const producto = await modificarProducto(req.body, id)
//     res.json(respuesta('Producto modificado', producto))
//   })

module.exports = router
