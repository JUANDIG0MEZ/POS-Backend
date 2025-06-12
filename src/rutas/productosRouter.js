const express = require('express')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${uuidv4()}${path.extname(file.originalname)}`)
  }
})

const {
  // validatorHandler,
  validatorHandlerFormData
} = require('../middlewares/validator.handler')

const {
  crearProductoSchema,
  actualizarProductoSchema
} = require('../schemas/producto.schema')

const upload = multer({ storage })

const { cargarImagenesProducto } = require('../servicios/productos/getProducto')
const { crearProducto } = require('../servicios/productos/postProducto')
const { modificarProducto } = require('../servicios/productos/patchProducto')

const { respuesta } = require('./funciones')
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
  upload.array('files', 20),
  validatorHandlerFormData(crearProductoSchema, 'body', 'data'),
  async (req, res, next) => {
    try {
      const producto = await crearProducto(req)
      res.json(respuesta('Producto creado', producto))
    } catch (error) {
      next(error)
    }
  })

router.patch('/:id',
  upload.array('files', 20),
  validatorHandlerFormData(actualizarProductoSchema, 'body', 'data'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const producto = await modificarProducto(req, id)
      res.json(respuesta('Producto modificado', producto))
    } catch (error) {
      next(error)
    }
  })

module.exports = router
