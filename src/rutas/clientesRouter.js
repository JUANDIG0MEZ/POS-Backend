const express = require('express')
const {
    cargarClientes,
    cargarCliente,
    cargarCompraCliente,
    cargarVentaCliente,
    cargarAbonosCliente,
    cargarPagosCliente

} = require('../servicios/getClientes')


// const {
//     crearCliente,
//     crearAbono,
//     crearPago 
// } = require('../servicios/otherClientes')



const router = express.Router()

router.get('/', async (req, res)=>{
    try {
        const clientes = await cargarClientes()
        res.json({
            status: 'success',
            message: 'Clientes cargados.',
            body: clientes
        })
    }
    catch {
        res.json({
            status: 'error',
            message: 'Error al cargar los clientes.',
            error: null
        })
    }

})


// router.get('/tipos', (req, res)=>{
//     const tipos = tiposClientes()
//     res.send(tipos)
// })

router.get('/:id', async (req, res)=>{
    const { id } = req.params
    const cliente = await cargarCliente(id)
    res.send(cliente)
})


router.get('/:id/abonos', async (req, res)=>{
    const { id } = req.params
    const abonos = await cargarAbonosCliente(id)
    res.send(abonos)
})

router.get('/:id/pagos', async (req, res)=>{
    const { id } = req.params
    const pagos = await cargarPagosCliente(id)
    res.send(pagos)
})

router.get('/:id/compras', async (req, res)=>{
    const { id } = req.params
    const compras = await cargarCompraCliente(id)
    res.send(compras)
})

router.get('/:id/ventas', async (req, res)=>{
    const { id } = req.params
    const ventas = await cargarVentaCliente(id)
    res.send(ventas)
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