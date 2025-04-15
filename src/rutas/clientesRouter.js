const express = require('express')
const {
    cargarClientes,
    cargarCliente,
    cargarCompraCliente,
    cargarVentaCliente,
    cargarAbonosCliente,
    cargarPagosCliente

} = require('../servicios/getClientes')

const {
    respuesta
} = require('./funciones')

const {
    // crearCliente,
    // crearAbono,
    crearPago 
} = require('../servicios/otherClientes')



const router = express.Router()

router.get('/', async (req, res, next)=>{
    try {
        const clientes = await cargarClientes()
        res.json(respuesta('Clientes cargados', clientes))
    }
    catch (error) {
        next(error)
    }
})


// router.get('/tipos', (req, res)=>{
//     const tipos = tiposClientes()
//     res.send(tipos)
// })

router.get('/:id', async (req, res, next)=>{
    try {
        const { id } = req.params
        const cliente = await cargarCliente(id)
        res.send(respuesta('Cliente cargado', cliente))
    }
    catch (error) {
        next(error)
    }
})


router.get('/:id/abonos', async (req, res, next)=>{
    try {
        const { id } = req.params
        const abonos = await cargarAbonosCliente(id)
        res.send(respuesta('Abonos cargados', abonos))
    }
    catch(error){
        next(error)
    }
})

router.get('/:id/pagos', async (req, res, next)=>{
    try {
        const { id } = req.params
        const pagos = await cargarPagosCliente(id)
        res.send(respuesta('Pagos cargados', pagos))
    }
    catch(error){
        next(error)
    }
})

router.get('/:id/compras', async (req, res, next)=>{
    try {
        const { id } = req.params
        const compras = await cargarCompraCliente(id)
        res.send(respuesta('Compras cargadas', compras))
    }
    catch(error){
        next(error)
    }
})

router.get('/:id/ventas', async (req, res, next)=>{
    try {
        const { id } = req.params
        const ventas = await cargarVentaCliente(id)
        res.send(respuesta('Ventas cargadas', ventas))
    }
    catch(error){
        next(error)
    }
})



router.post('/:id/pagos', async (req, res, next)=> {
    try {
        const {id} = req.params
        const pago = await crearPago()
        res.send(respuesta('Pago realizado', pago))
    }
    catch (error) {
        next(error)
    }
})


// router.post('/', async (req, res)=> {
//     const body = req.body
//     try {
//         const cliente = await crearCliente(body)
//         res.json({
//             message: 'Cliente creado',
//             body: cliente
//         })
//     }
//     catch (error) {
//         res.json({
//             message: 'Error al crear el cliente',
//             error
//         })
//     }
// })



// router.post('/abonos', async (req, res)=> {
//     const body = req.body
//     try {
//         const abono = await crearAbono(body)
//         res.json({
//             message: 'Abono creado',
//             body: abono
//         })
//     }
//     catch (error) {
//         res.json({
//             message: 'Error al crear el abono',
//             error
//         })
//     }
// })


// router.post('/pagos', async (req, res)=> {
//     const body = req.body
//     try {
//         const pago = await crearPago(body)
//         res.json({
//             message: 'Pago creado',
//             body: pago
//         })
//     }
//     catch (error) {
//         res.json({
//             message: 'Error al crear el pago',
//             error
//         })
//     }
// })

module.exports = router