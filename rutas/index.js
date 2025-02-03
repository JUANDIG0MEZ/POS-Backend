const express = require('express')
const productosRouter = require('./productosRouter')
const usuariosRouter = require('./clientesRouter')
const facturasVentaRouter = require('./facturasVentaRouter')  
const facturasCompraRouter = require('./facturasCompraRouter')

function routerAPI (app){
    const router = express.Router()
    app.use('/api/v1', router)
    router.use('/productos', productosRouter)
    router.use('/facturas/venta', facturasVentaRouter)
    router.use('/facturas/compra', facturasCompraRouter)
    router.use('/clientes', usuariosRouter)
}


module.exports = routerAPI