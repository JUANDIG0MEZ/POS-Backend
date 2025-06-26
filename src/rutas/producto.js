// const { cargarImagenesProducto } = require('../servicios/productos/getProducto')
// const { crearProducto, crearCategoria } = require('../servicios/productos/postProducto')
// const { modificarProducto } = require('../servicios/productos/patchProducto')

// const {
//   crearProductoSchema,
//   crearCategoriaSchema,
//   actualizarProductoSchema,
//   paramsProductosSchema,
//   queryProductosSchema
// } = require('../schemas/producto')
// const { validatorHandler } = require('../middlewares/validatorHandler')

// const { respuesta } = require('./funciones')

// const express = require('express')

// const router = express.Router()

// router.post('/',
//   validatorHandler(crearProductoSchema, 'body'),
//   async (req, res) => {
//     const producto = await crearProducto(req.body)
//     res.json(respuesta('Producto creado', producto))
//   })

// router.patch('/:id',
//   validatorHandler(actualizarProductoSchema, 'body'),
//   async (req, res) => {
//     const { id } = req.params
//     const producto = await modificarProducto(req.body, id)
//     res.json(respuesta('Producto modificado', producto))
//   })

// router.post('/categoria',
//   validatorHandler(crearCategoriaSchema, 'body'),
//   async (req, res) => {
//     const categoria = await crearCategoria(req.body)
//     res.json(respuesta('Categoria creada', categoria))
//   })

// module.exports = router
