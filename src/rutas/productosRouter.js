const { cargarImagenesProducto } = require('../servicios/productos/getProducto')
const { crearProducto, crearCategoria } = require('../servicios/productos/postProducto')
const { modificarProducto } = require('../servicios/productos/patchProducto')

const { respuesta } = require('./funciones')

const express = require('express')

// const {
//   // validatorHandler,
//   validatorHandlerFormData
// } = require('../middlewares/validator.handler')

// const {
//   crearProductoSchema,
//   actualizarProductoSchema
// } = require('../schemas/producto.schema')

const router = express.Router()

router.get('/:id/imagenes', async (req, res, next) => {
  try {
    const { id } = req.params
    const imagenes = await cargarImagenesProducto(id)
    res.json(respuesta('Imagenes cargadas', imagenes))
  } catch (error) {
    next(error)
  }
})

router.post('/',
  async (req, res, next) => {
    try {
      console.log('body', req.body)
      const producto = await crearProducto(req.body)
      res.json(respuesta('Producto creado', producto))
    } catch (error) {
      next(error)
    }
  })

router.patch('/:id',
  async (req, res, next) => {
    try {
      const { id } = req.params
      console.log(req.body)
      const producto = await modificarProducto(req.body, id)
      res.json(respuesta('Producto modificado', producto))
    } catch (error) {
      next(error)
    }
  })

router.post('/categoria', async (req, res, next) => {
  try {
    const categoria = await crearCategoria(req.body)
    res.json(respuesta('Categoria creada', categoria))
  } catch (error) {
    next(error)
  }
})

module.exports = router
