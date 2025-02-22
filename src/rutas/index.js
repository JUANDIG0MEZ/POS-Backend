const express = require('express')
const productosRouter = require('./productosRouter')
const usuariosRouter = require('./clientesRouter')
const facturasRouter = require('./facturasRouter')


function routerAPI (app){
    const router = express.Router()
    app.use('/api/v1', router)
    router.use('/productos', productosRouter)
    router.use('/facturas', facturasRouter)
    router.use('/clientes', usuariosRouter)
}


module.exports = routerAPI