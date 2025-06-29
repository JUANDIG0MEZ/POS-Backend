// const { cargarImagenesProducto } = require('../servicios/productos/getProducto')
const { crearProducto, crearCategoria } = require('../servicios/producto/post.js')
// const { modificarProducto } = require('../servicios/productos/patchProducto')

const {
  crearProductoSchema,
  crearCategoriaSchema
//   crearCategoriaSchema,
//   actualizarProductoSchema,
//   paramsProductosSchema,
} = require('../schemas/producto')
const { validatorHandler } = require('../middlewares/validatorHandler')

const { respuesta } = require('./funcion.js')

const express = require('express')
const { cargarProductos, cargarCategorias } = require('../servicios/producto/get')
const { requireUser } = require('../middlewares/autenticationHandler')

const router = express.Router()

router.get('/',
  requireUser,
  async (req, res) => {
    const { usuarioId } = req.usuario
    const productos = await cargarProductos({ usuarioId })
    res.json(respuesta('Producto cargados', productos))
  })

router.get('/categoria',
  requireUser,
  async (req, res) => {
    const { usuarioId } = req.usuario
    const categorias = await cargarCategorias({ usuarioId })
    res.json(respuesta('Categorias cargadas', categorias))
  })

router.post('/',
  requireUser,
  validatorHandler(crearProductoSchema, 'body'),
  async (req, res) => {
    const { usuarioId } = req.usuario
    const {
      nombre,
      categoria_id,
      medida_id,
      precio_compra,
      precio_venta,
      cantidad
    } = req.body
    const producto = await crearProducto({ usuarioId, nombre, categoria_id, medida_id, precio_compra, precio_venta, cantidad })
    res.json(respuesta('Producto creado', producto))
  })

router.post('/categoria',
  requireUser,
  validatorHandler(crearCategoriaSchema, 'body'),
  async (req, res) => {
    const { usuarioId } = req.usuario
    console.log('body', req.body)
    const {
      nombre,
      descripcion
    } = req.body
    const categoria = await crearCategoria({ usuarioId, nombre, descripcion })
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
