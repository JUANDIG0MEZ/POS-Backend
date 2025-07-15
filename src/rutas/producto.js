const {
  queryAjusteSchema,
  crearProductoSchema,
  crearCategoriaSchema,
  crearAjusteInventarioSchema,
  actualizarProductoSchema
} = require('../schemas/producto')

const {
  cargarProductos,
  cargarCategorias,
  cargarMedidas,
  cargarAjustesInventario,
  cargarAjusteInventario
} = require('../servicios/producto/get')

const {
  modificarProducto
} = require('../servicios/producto/patch.js')
const {
  crearProducto,
  crearCategoria,
  crearAjusteInventario
} = require('../servicios/producto/post.js')

const { validatorHandler } = require('../middlewares/validatorHandler')
const { respuesta } = require('./funcion.js')
const express = require('express')
const { requireUser } = require('../middlewares/autenticationHandler')

const router = express.Router()

router.get('/',
  requireUser,
  async (req, res) => {
    const { idUsuario } = req.usuario
    const productos = await cargarProductos({ idUsuario })
    console.log(productos)
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
    const body = req.validated.body
    const producto = await crearProducto({ idUsuario, body })
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

router.get('/ajuste',
  requireUser,
  validatorHandler(queryAjusteSchema, 'query', true),
  async (req, res) => {
    const { idUsuario } = req.usuario
    const { limit, offset } = req.validated.query
    const ajustes = await cargarAjustesInventario({ idUsuario }, { limit, offset })
    res.json(respuesta('Ajustes cargados', ajustes))
  }
)

router.get('/ajuste/:id',
  requireUser,
  async (req, res) => {
    const { idUsuario } = req.usuario
    const { id } = req.params
    const ajuste = await cargarAjusteInventario({ idUsuario, ajuste_id: id })
    res.json(respuesta('Ajustes cargado', ajuste))
  }
)

router.post('/ajuste',
  requireUser,
  validatorHandler(crearAjusteInventarioSchema, 'body'),
  async (req, res) => {
    const { idUsuario } = req.usuario
    const {
      detalles
    } = req.validated.body
    console.log('detalles', detalles)
    const ajuste = await crearAjusteInventario({ idUsuario, detalles })
    res.json(respuesta('Ajuste creado', ajuste))
  }
)

router.patch('/:id',
  requireUser,
  validatorHandler(actualizarProductoSchema, 'body'),
  async (req, res) => {
    const { idUsuario } = req.usuario
    const { id } = req.params
    const producto = await modificarProducto({ idUsuario, producto_id: id, body: req.validated.body })
    res.json(respuesta('Producto modificado', producto))
  })

module.exports = router
