const express = require('express')
const {
    cargarFacturasCompra,
    cargarFacturasVenta,
    cargarFacturaCompra,
    cargarFacturaVenta    
} = require('../servicios/getFacturas') 
const router = express.Router()


router.get('/ventas/', async (req, res)=> {
    const facturas = await cargarFacturasVenta()
    res.send(facturas)
})

router.get('/ventas/:id', async (req, res)=> {
    const id = req.params.id
    const factura = await cargarFacturaVenta(id)
    res.send(factura)
})


router.get('/compras/', async (req, res)=> {
    const facturas = await cargarFacturasCompra()
    res.send(facturas)
})

router.get('/compras/:id', async (req, res)=> {
    const id = req.params.id 
    const factura = await cargarFacturaCompra(id)
    res.send(factura)
})



// router.post('/ventas', async (req, res)=> {
//     const body = req.body
//     try {
//         const factura = await crearFacturaVenta(body)
//         res.json({
//             message: 'Factura creada',
//             body: factura
//         })
//     }
//     catch (error) {
//         res.json({
//             message: 'Error al crear la factura',
//             error
//         })
//     }
// })


// router.post('/compras', async (req, res)=> {
//     const body = req.body
//     try {
//         const factura = await crearFacturaCompra(body)
//         res.json({
//             message: 'Factura creada',
//             body: factura
//         })
//     }
//     catch (error) {
//         res.json({
//             message: 'Error al crear la factura',
//             error
//         })
//     }
// })


router.post()


module.exports = router
