// const express = require('express')
// const {
//   respuesta
// } = require('./funciones')

// const {
//   cargarClientes,
//   cargarCliente,
//   cargarAbonosCliente,
//   cargarPagosCliente
// } = require('../servicios/clientes/getCliente')

// const {
//   cargarComprasCliente,
//   cargarVentasCliente
// } = require('../servicios/clientes/getCliente')

// const {
//   crearCliente
// } = require('../servicios/clientes/postCliente')

// const router = express.Router()

// router.get('/',
//   async (req, res) => {
//     const clientes = await cargarClientes(req.query)
//     res.json(respuesta('Clientes cargados', clientes))
//   })

// router.get('/:id',
//   async (req, res) => {
//     const { id } = req.params
//     const cliente = await cargarCliente(id)
//     res.send(respuesta('Cliente cargado', cliente))
//   })

// router.get('/:id/abonos',
//   async (req, res) => {
//     const { id } = req.params
//     const abonos = await cargarAbonosCliente(id, req.query)
//     res.send(respuesta('Abonos cargados', abonos))
//   })

// router.get('/:id/pagos',
//   async (req, res) => {
//     const { id } = req.params
//     const pagos = await cargarPagosCliente(id, req.query)
//     res.send(respuesta('Pagos cargados', pagos))
//   })

// router.get('/:id/compras',
//   async (req, res) => {
//     const { id } = req.params
//     const compras = await cargarComprasCliente(id, req.query)
//     res.send(respuesta('Compras cargadas', compras))
//   })

// router.get('/:id/ventas', async (req, res) => {
//   const { id } = req.params
//   const ventas = await cargarVentasCliente(id, req.query)
//   res.send(respuesta('Ventas cargadas', ventas))
// })

// // router.post('/:id/pagos', async (req, res, ) => {
// //   try {
// //     const { id } = req.params
// //     const pago = await crearPago(id)
// //     res.send(respuesta('Pago realizado', pago))
// //   } catch (error) {
// //     (error)
// //   }
// // })

// router.post('/',
//   async (req, res) => {
//     const body = req.body
//     const cliente = await crearCliente(body)
//     res.json(respuesta('Cliente creado', cliente))
//   })

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

// module.exports = router
