const { Cliente } = require('../database/models')
const { Compra, Venta, DetalleCompra, DetalleVenta, Producto} = require('../database/models')

async function cargarFacturasCompra(){
    const facturas = await Compra.findAll(
        {
            include: {
                model: Cliente,
                as: "clienteCompra",
                attributes: ['nombre']
            },
            //se excluye el id del cliente
            attributes: {exclude: ['cliente_id']}
        }
    )

    const facturasFormateadas = facturas.map(factura => {
        return {
            id: factura.id,
            fecha: factura.fecha,
            hora: factura.hora,
            cliente: factura.clienteCompra.nombre,
            por_pagar: factura.por_pagar,
            total: factura.total,
            estado: factura.estado
        }
    })
    return facturasFormateadas
}



async function cargarFacturasVenta(){
    const facturas = await Venta.findAll(
        {
            include: {
                model: Cliente, as: 'clienteVenta', attributes: ['nombre']
            },
            attributes: {exclude: ['cliente_id']}
        }
    )

    const facturasFormateadas = facturas.map(factura => {
        return {
            id: factura.id,
            fecha: factura.fecha,
            hora: factura.hora,
            cliente: factura.clienteVenta.nombre,   
            por_pagar: factura.por_pagar,
            total: factura.total,
            estado: factura.estado,
        }
    })
    return facturasFormateadas
}

async function cargarFacturaCompra(id){
    const info = await Compra.findByPk(id, {
        include: {
            model: Cliente,
            as: "clienteCompra",
            attributes: ['nombre', 'email', 'telefono']
        },
        attributes: {exclude: ['cliente_id']}
    })
    const infoFormateada = {
        id: info.id,
        fecha: info.fecha,
        hora: info.hora,
        cliente: info.clienteCompra.nombre,
        email: info.clienteCompra.email,
        telefono: info.clienteCompra.telefono,
        por_pagar: info.por_pagar,
        total: info.total,
        estado: info.estado
    }
    const datos = await DetalleCompra.findAll({
        where: {
            compra_id: id
        },
        include: {
            model: Producto, as: 'productoDetalle', attributes: ['nombre']
        }
        
    })

    const datosFormateados = datos.map(dato => {
        return {
            id: dato.producto_id,
            producto: dato.productoDetalle.nombre,
            cantidad: dato.cantidad,
            precio: dato.precio,
            total: dato.total
        }
    })

    return {info: infoFormateada,  datos: datosFormateados}
}

async function cargarFacturaVenta(id){
    const factura = await Venta.findByPk(id, {
        include: {
            model: Cliente, as: 'clienteVenta', attributes: ['nombre', 'telefono', 'email', 'direccion'],
        }
    })

    const facturaFormateada = {
        id: factura.id,
        fecha: factura.fecha,
        hora: factura.hora,
        cliente: factura.clienteVenta.nombre,
        email: factura.clienteVenta.email,
        direccion: factura.clienteVenta.direccion,
        telefono: factura.clienteVenta.telefono,
        por_pagar: factura.por_pagar,
        total: factura.total,
        estado: factura.estado

    }
    const datos = await DetalleVenta.findAll({
        where: {
            venta_id: id
        },
        include: {model: Producto, as: 'productoDetalle', attributes: ['nombre']}
    
    })
    const datosFormateados = datos.map( dato => {
        return {
            id: dato.producto_id,
            producto: dato.productoDetalle.nombre,
            cantidad: dato.cantidad,
            precio: dato.precio,
            total: dato.total
        }
    })
    return {info: facturaFormateada, datos: datosFormateados}
}

module.exports = {
    cargarFacturasCompra,
    cargarFacturasVenta,
    cargarFacturaCompra,
    cargarFacturaVenta
}