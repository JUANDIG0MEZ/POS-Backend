const express = require('express')
const { respuesta } = require('./funciones')

const {
    cargarFacturasCompra,
    cargarFacturaCompra,
    cargarEstadosComprasEntrega,
    cargarEstadosComprasPago
} = require('../servicios/facturasCompra/getFacturaCompra')

const {
    modificarCompra
} = require('../servicios/facturasCompra/patchFacturaCompra')

const {
    crearFacturaCompra
} = require('../servicios/facturasCompra/postFacturaCompra')

const {
    crearPagoFactura
} = require('../servicios/clientes/postCliente')

const router = express.Router()






router.get('/', async (req, res, next)=> {
    try {
        const facturas = await cargarFacturasCompra(req.query)
        res.json(respuesta('Facturas de compra cargadas', facturas))
    }
    catch (error) {
        next(error)
    }
})

router.get('estados/entrega', async (req, res, next) => {

    try {
        const estados = await cargarEstadosComprasEntrega()
        res.json(respuesta('Estados de compra cargados', estados))
    }
    catch (error) {
        next(error)
    }
})

router.get('/estados/pago', async (req, res, next) => {
    
    try {
        const estados = await cargarEstadosComprasPago()
        res.json(respuesta('Estados de compra cargados', estados))
    }
    catch (error) {
        next(error)
    }
})


router.get('/:id', async (req, res, next)=> {
    try {
        const id = req.params.id 
        const factura = await cargarFacturaCompra(id)
        res.send(respuesta('Factura de compra cargada', factura))
    }
    catch (error) {
        next(error)
    }
    
})



router.patch('/:id', async (req, res, next)=> {
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




router.post('/', async (req, res, next)=> {
    try {
        
        const body = req.body
        console.log(body)
        const factura = await crearFacturaCompra(body)
        res.json(respuesta('Factura de compra creada', factura))
    }
    catch (error) {
        next(error)
    }
})






router.patch('/:id/pagar', async (req, res, next) => {
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






module.exports = router