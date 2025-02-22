const { Compra, Venta} = require('../database/models')

async function cargarFacturasCompra(){
    const facturas = await Compra.findAll()
    return facturas
}

async function cargarFacturaCompra(id){
    const factura = await Compra.findByPk(id)
    return factura

}

async function cargarFacturasVenta(){
    const facturas = await Venta.findAll()
    return facturas
}

async function cargarFacturaVenta(id){
    const factura = await Venta.findByPk(id)
    return factura
}

module.exports = {
    cargarFacturasCompra,
    cargarFacturasVenta,
    cargarFacturaCompra,
    cargarFacturaVenta
}