const { Compra, Venta, DetalleCompra, DetalleVenta} = require('../database/models')

async function cargarFacturasCompra(){
    const facturas = await Compra.findAll()
    return facturas
}

async function cargarFacturaCompra(id){
    const factura = await Compra.findByPk(id)
    const datos = await DetalleCompra.findAll({
        where: {
            compra_id: id
        }
    })
    return {info: factura,  datos: datos}

}

async function cargarFacturasVenta(){
    const facturas = await Venta.findAll()
    return facturas
}

async function cargarFacturaVenta(id){
    const factura = await Venta.findByPk(id)
    const datos = await DetalleVenta.findAll({
        where: {
            venta_id: id
        }
    })
    return {info: factura, datos: datos}
}

module.exports = {
    cargarFacturasCompra,
    cargarFacturasVenta,
    cargarFacturaCompra,
    cargarFacturaVenta
}