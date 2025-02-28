const { Cliente } = require('../database/models')
const { Compra, Venta, DetalleCompra, DetalleVenta, Producto} = require('../database/models')

async function cargarFacturasCompra(){
    const facturas = await Compra.findAll(
        {
            include: {
                model: Cliente,
                as: "clienteCompra",
                attributes: ['nombre']
            }
        }
    )
    return facturas
}

async function cargarFacturaCompra(id){
    const factura = await Compra.findByPk(id, {
        include: {
            model: Cliente,
            as: "clienteCompra",
            attributes: ['nombre']
        }
    })
    const datos = await DetalleCompra.findAll({
        where: {
            compra_id: id
        },
        include: {model: Producto, as: 'productoDetalle', attributes: ['nombre']}
        
    })
    return {info: factura,  datos: datos}

}

async function cargarFacturasVenta(){
    const facturas = await Venta.findAll(
        {
            include: {
                model: Cliente, as: 'clienteVenta', attributes: ['nombre']
            }
        }
    )
    return facturas
}

async function cargarFacturaVenta(id){
    const factura = await Venta.findByPk(id, {
        include: {
            model: Cliente, as: 'clienteVenta', attributes: ['nombre']
        }
    })
    const datos = await DetalleVenta.findAll({
        where: {
            venta_id: id
        },
        include: {model: Producto, as: 'productoDetalle', attributes: ['nombre']}
    
    })
    return {info: factura, datos: datos}
}

module.exports = {
    cargarFacturasCompra,
    cargarFacturasVenta,
    cargarFacturaCompra,
    cargarFacturaVenta
}