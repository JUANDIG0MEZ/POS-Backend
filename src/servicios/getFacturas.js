const { Cliente } = require('../database/models')
const { Compra, Venta, DetalleCompra, DetalleVenta, Producto, ProductoMarca, ProductoMedida} = require('../database/models')

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
            pagado: factura.pagado,
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
            pagado: factura.pagado,
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
        telefono: parseInt(info.clienteCompra.telefono),
        pagado: parseInt(info.pagado),
        total: parseInt(info.total),
        estado: info.estado
    }
    const datos = await DetalleCompra.findAll({
        where: {
            compra_id: id
        },
        include: {
            model: Producto,
            as: 'productoDetalle',
            attributes: ['nombre'],
            include: [
                {model: ProductoMarca, as: 'marcaProducto', attributes: ['nombre']},
                {model: ProductoMedida, as: 'medidaProducto', attributes: ['nombre']}

            ]
        }
        
    })

    const datosFormateados = datos.map(dato => {
        return {
            id: dato.producto_id,
            cantidad: parseInt(dato.cantidad),
            nombre: dato.productoDetalle.nombre,
            marca: dato.productoDetalle.marcaProducto.nombre,
            medida: dato.productoDetalle.medidaProducto.nombre,
            precio: parseInt(dato.precio),
            subtotal: parseInt(dato.subtotal)
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
        pagado: factura.pagado,
        total: factura.total,
        estado: factura.estado

    }
    const datos = await DetalleVenta.findAll({
        where: {
            venta_id: id
        },
        include: {model: Producto, as: 'productoDetalle', attributes: ['nombre', 'marca_id', 'medida_id']}
    
    })
    const datosFormateados = datos.map( dato => {
        return {
            id: dato.producto_id,
            cantidad: dato.productoDetalle.cantidad,
            nombre: dato.productoDetalle.nombre,
            marca: dato.productoDetalle.marca_id,
            medida: dato.productoDetalle.medida_id,
            precio: dato.precio,
            subtotal: dato.subtotal
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