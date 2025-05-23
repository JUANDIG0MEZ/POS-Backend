const express = require('express')
const {
    cargarFacturasCompra,
    cargarFacturasVenta,
    cargarFacturaCompra,
    cargarFacturaVenta,
} = require('../servicios/getFacturas') 

const {
    crearPagoFactura,
    crearAbonoFactura
} = require('../servicios/otherClientes')

const {
    modificarCompra,
    modificarVenta,
    crearFacturaCompra,
    crearFacturaVenta
} = require('../servicios/otherFacturas')

const {
    respuesta
} = require('./funciones')

const router = express.Router()

router.get('/ventas/', async (req, res, next)=> {
    try {
        const limit = parseInt(req.query.limit) || 100
        const offset = parseInt(req.query.offset) || 0
        const facturas = await cargarFacturasVenta(limit, offset)
        res.json(respuesta('Facturas de venta cargadas', facturas))
    }
    catch (error) {
        next(error)
    }
})

router.get('/ventas/:id', async (req, res, next)=> {
    try {
        const id = req.params.id
        const factura = await cargarFacturaVenta(id)
        res.json(respuesta('Factura de venta cargada', factura))
    }
    catch (error) {
        next(error)
    }
})

router.get('/compras/', async (req, res, next)=> {
    try {
        const limit = parseInt(req.query.limit) || 100
        const offset = parseInt(req.query.offset) || 0

        console.log('limit', typeof limit)
        const facturas = await cargarFacturasCompra(limit, offset)
        res.json(respuesta('Facturas de compra cargadas', facturas))
    }
    catch (error) {
        next(error)
    }
})

router.get('/compras/:id', async (req, res, next)=> {
    try {
        const id = req.params.id 
        const factura = await cargarFacturaCompra(id)
        res.send(respuesta('Factura de compra cargada', factura))
    }
    catch (error) {
        next(error)
    }
    
})



router.patch('/compras/:id', async (req, res, next)=> {
    try {
        const body = req.body
        const id = req.params.id
        const factura = await modificarCompra(body, id)
        res.json(respuesta('Factura de compra modificada', factura))
    }
    catch (error) {
        next(error)
    }
})


router.patch('/ventas/:id', async (req, res, next)=> {
    
    try {
        const id = req.params.id
        const body = req.body
        const factura = await modificarVenta(body, id)
        res.json(respuesta('Factura de venta modificada', factura))
    }
    catch (error) {
        next(error)
    }
})

router.post('/compras', async (req, res, next)=> {
    try {
        const body = req.body
        const factura = await crearFacturaCompra(body)
        res.json(respuesta('Factura de compra creada', factura))
    }
    catch (error) {
        next(error)
    }
})


router.post('/ventas', async (req, res, next)=> {
    try {
        const body = req.body
        const factura = await crearFacturaVenta(body)
        res.json(respuesta('Factura de venta creada', factura))
    }
    catch (error) {
        next(error)
    }
})



router.patch('/compras/:id/pagar', async (req, res, next) => {
    try {
        const id = req.params.id
        const body = req.body
        const abono = await crearPagoFactura(body, id)
        res.json(respuesta('Pago realizado', abono))
    }
    catch (error) {
        next(error)
    }

})


router.patch('/ventas/:id/abonar', async (req, res, next) => {
    try {
        const id = req.params.id
        const body = req.body
        const abono = await crearAbonoFactura(body, id)
        res.json(respuesta('Abono realizado', abono))
    }
    catch (error) {
        next(error)
    }

})

// router.patch('/', async (req, res)=> {
//     const body = req.body
//     try {
//         const producto = await modificarProducto(body)
//         res.json({
//             status: "success",
//             message: 'Producto modificado',
//             data: producto
//         })
//     }
//     catch {
//         res.json({
//             status: "error",
//             message: 'Error al modificar el producto',
//             data: null
//         })
//     }
// })




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







module.exports = router
