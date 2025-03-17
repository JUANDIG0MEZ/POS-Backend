const express = require('express')
const {
    cargarFacturasCompra,
    cargarFacturasVenta,
    cargarFacturaCompra,
    cargarFacturaVenta
} = require('../servicios/getFacturas') 

const {
    modificarCompra,
    modificarVenta,
    crearFacturaCompra   
} = require('../servicios/otherFacturas')
const router = express.Router()


router.get('/ventas/', async (req, res)=> {
    try {
        const facturas = await cargarFacturasVenta()
        res.json({
            status: 'success',
            message: 'Facturas de venta cargadas.',
            body: facturas
        })
    }
    catch {
        res.json({
            status: 'error',
            message: 'Error al cargar las facturas de venta.',
            error: null
        })
    }
})

router.get('/ventas/:id', async (req, res)=> {
    try {
        const id = req.params.id
        const factura = await cargarFacturaVenta(id)
        res.json({
            status: 'success',
            message: 'Factura cargada',
            body: factura
        })
    }
    catch{
        res.json({
            status: 'error',
            message: 'Error al cargar la factura',
            error: null
        })
    }
})



router.get('/compras/', async (req, res)=> {
    try {
        const facturas = await cargarFacturasCompra()
        res.json({
            status: 'success',
            message: 'Facturas de compra cargadas.',
            body: facturas
        })
    }
    catch (error) {
        res.json({
            status: 'error',
            message: 'Error al cargar las facturas de compra.',
            error: error.errors.message
        })
    }
})

router.get('/compras/:id', async (req, res)=> {
    const id = req.params.id 
    const factura = await cargarFacturaCompra(id)
    res.send(factura)
})



router.patch('/compras/:id', async (req, res)=> {
    try {
        const body = req.body
        const id = req.params.id
        const factura = await modificarCompra(body, id)
        res.json({
            status: 'success',
            message: 'Factura modificada',
            body: factura
        })
    }
    catch (error) {
        res.json({
            status: 'error',
            message: 'Error al modificar la factura',
            error : error
        })
    }
})


router.patch('/ventas/:id', async (req, res)=> {
    
    try {
        const id = req.params.id
        const body = req.body
        const factura = await modificarVenta(body, id)
        res.json({
            status: 'success',
            message: 'Factura creada',
            body: factura
        })
    }
    catch (error) {
        res.json({
            status: 'error',
            message: 'Error al crear la factura',
            error: error
        })
    }
})




router.post('/compras', async (req, res)=> {
    try {
        const body = req.body
        const factura = await crearFacturaCompra(body)
        res.json({
            status: 'success',
            message: 'Factura creada',
            body: factura
        })
    }
    catch (error) {
        res.json({
            status: 'error',
            message: 'Error al crear la factura',
            error: error
        })
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
