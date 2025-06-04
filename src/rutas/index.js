const express = require('express')
const productosRouter = require('./productosRouter')
// const usuariosRouter = require('./clientesRouter')
const facturaCompraRouter = require('./facturaCompraRouter')
const facturaVentaRouter = require('./facturaVentaRouter')
// const pagosRouter = require('./pagos')
const initRouter = require('./init')


function routerAPI (app){
    const router = express.Router()
    app.use('/api/v1', router)
    router.use('/productos', productosRouter)
    router.use('/facturas/compras', facturaCompraRouter)
    router.use('/facturas/ventas', facturaVentaRouter)
    // router.use('/clientes', usuariosRouter)
    // router.use('/pagos', pagosRouter)
    router.use('/init', initRouter)
}


module.exports = routerAPI