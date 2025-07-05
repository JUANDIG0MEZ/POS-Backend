const express = require('express')
const {
  respuesta
} = require('./funcion')

const { cargarCliente, cargarClientes, cargarClienteTipos, cargarClientesNombres, cargarAbonosCliente, cargarComprasCliente, cargarVentasCliente, cargarPagosCliente } = require('../servicios/cliente/get.js')
const { crearCliente } = require('../servicios/cliente/post.js')
const {
  queryClientesSchema,
  crearClienteSchema,
  queryClienteSchema
} = require('../schemas/cliente.js')

const { validatorHandler } = require('../middlewares/validatorHandler.js')
const { requireUser } = require('../middlewares/autenticationHandler.js')

// const {
//   cargarComprasCliente,
//   cargarVentasCliente
// } = require('../servicios/clientes/getCliente')

// const {
//   crearCliente
// } = require('../servicios/clientes/postCliente')

const router = express.Router()

router.get('/',
  validatorHandler(queryClientesSchema, 'query', true),
  requireUser,
  async (req, res) => {
    const {
      limit,
      offset,
      columna,
      orden,
      cliente_id,
      id_tipo
    } = req.validated.query
    const { idUsuario } = req.usuario

    const clientes = await cargarClientes({ idUsuario, orden, columna, offset, limit, cliente_id, id_tipo })
    res.json(respuesta('Clientes cargados', clientes))
  })

router.get('/nombre',
  requireUser,
  async (req, res) => {
    const { idUsuario } = req.usuario
    const clientes = await cargarClientesNombres({ idUsuario })
    res.json(respuesta('Nombres de clientes cargados', clientes))
  }
)

router.get('/tipo',
  requireUser,
  async (req, res) => {
    const tipos = await cargarClienteTipos()
    res.json(respuesta('Tipos de cliente cargados', tipos))
  }
)

router.get('/:id',
  requireUser,
  async (req, res) => {
    const { idUsuario } = req.usuario
    const { id } = req.params
    const cliente = await cargarCliente({ idUsuario, cliente_id: id })
    res.send(respuesta('Cliente cargado', cliente))
  })

router.get('/:id/abonos',
  requireUser,
  validatorHandler(queryClienteSchema, 'query', true),
  async (req, res) => {
    const { idUsuario } = req.usuario
    const { id } = req.params
    const { limit } = req.validated.query
    const abonos = await cargarAbonosCliente({ idUsuario, cliente_id: id, limit })
    res.send(respuesta('Abonos cargados', abonos))
  })

router.get('/:id/pagos',
  requireUser,
  validatorHandler(queryClienteSchema, 'query', true),
  async (req, res) => {
    const { idUsuario } = req.usuario
    const { id } = req.params
    const { limit } = req.validated.query
    const pagos = await cargarPagosCliente({ idUsuario, cliente_id: id, limit })
    res.send(respuesta('Pagos cargados', pagos))
  })

router.get('/:id/compras',
  requireUser,
  validatorHandler(queryClienteSchema, 'query', true),
  async (req, res) => {
    const { idUsuario } = req.usuario
    const { id } = req.params
    const { limit } = req.validated.query
    const compras = await cargarComprasCliente({ idUsuario, cliente_id: id, limit })
    res.send(respuesta('Compras cargadas', compras))
  })

router.get('/:id/ventas',
  requireUser,
  validatorHandler(queryClienteSchema, 'query', true),
  async (req, res) => {
    const { idUsuario } = req.usuario
    const { id } = req.params
    const { limit } = req.validated.query
    const ventas = await cargarVentasCliente({ idUsuario, cliente_id: id, limit })
    res.send(respuesta('Ventas cargadas', ventas))
  })

// // router.post('/:id/pagos', async (req, res, ) => {
// //   try {
// //     const { id } = req.params
// //     const pago = await crearPago(id)
// //     res.send(respuesta('Pago realizado', pago))
// //   } catch (error) {
// //     (error)
// //   }
// // })

router.post('/',
  requireUser,
  validatorHandler(crearClienteSchema, 'body'),
  async (req, res) => {
    const {
      cliente_id,
      nombre,
      direccion,
      telefono,
      email,
      id_tipo
    } = req.validated.body
    const { idUsuario } = req.usuario

    const cliente = await crearCliente({ idUsuario, cliente_id, nombre, direccion, telefono, email, id_tipo })
    console.log('cioente creado')
    res.json(respuesta('Cliente creado', cliente))
  })

// // router.post('/abonos', async (req, res)=> {
// //     const body = req.body
// //     try {
// //         const abono = await crearAbono(body)
// //         res.json({
// //             message: 'Abono creado',
// //             body: abono
// //         })
// //     }
// //     catch (error) {
// //         res.json({
// //             message: 'Error al crear el abono',
// //             error
// //         })
// //     }
// // })

// // router.post('/pagos', async (req, res)=> {
// //     const body = req.body
// //     try {
// //         const pago = await crearPago(body)
// //         res.json({
// //             message: 'Pago creado',
// //             body: pago
// //         })
// //     }
// //     catch (error) {
// //         res.json({
// //             message: 'Error al crear el pago',
// //             error
// //         })
// //     }
// // })

module.exports = router
