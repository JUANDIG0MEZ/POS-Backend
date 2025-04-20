const { Cliente,  VentaEstado, CompraEstado} = require('../database/models')
const { Compra, Venta, DetalleCompra, DetalleVenta, Producto, ProductoMarca, ProductoMedida} = require('../database/models')

async function cargarFacturasCompra(){
    const facturas = await Compra.findAll(
        {
            include: [
                {model: Cliente, as: "clienteCompra", attributes: ['nombre']}, 
                {model: CompraEstado, as: 'estadoCompra', attributes: ['nombre']}],
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
            estado_id: factura.estado_id,
            estado: factura.estadoCompra.nombre
        }
    })
    return facturasFormateadas
}



async function cargarFacturasVenta(){
    const facturas = await Venta.findAll(
        {
            include: [
                {model: VentaEstado, as: 'estadoVenta', attributes: ['nombre']},
                {model: Cliente, as: 'clienteVenta', attributes: ['nombre']}
            ],
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
            estado_id: factura.estado_id,
            estado: factura.estadoVenta.nombre,
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
        attributes: {exclude: ['cliente_id'],}
    })
    const infoFormateada = {
        id: info.id,
        fecha: info.fecha,
        hora: info.hora,
        cliente: info['clienteCompra.nombre'],
        email: info['clienteCompra.email'],
        telefono: parseInt(info['clienteCompra.telefono']),
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
            as: 'productoDetalleCompra',
            attributes: ['nombre'],
            include: [
                {model: ProductoMarca, as: 'marcaProducto', attributes: ['nombre']},
                {model: ProductoMedida, as: 'medidaProducto', attributes: ['nombre']}

            ]
        }
    })

    console.log(datos)
    const datosFormateados = datos.map(dato => {
        return {
            id: dato.producto_id,
            nombre: dato.productoDetalleCompra.nombre,
            marca: dato.productoDetalleCompra.marcaProducto.nombre,
            medida: dato.productoDetalleCompra.medidaProducto.nombre,
            cantidad: parseInt(dato.cantidad),
            precio: parseInt(dato.precio),
            subtotal: parseInt(dato.subtotal)
        }
    })

    return {info: infoFormateada,  datos: datosFormateados}
}


async function cargarFacturaVenta(id){
    const factura = await Venta.findByPk(id, {
        include: {
            model: Cliente, as: 'clienteVenta', attributes: ['nombre', 'telefono', 'email'],
        }
    })

    const facturaFormateada = {
        id: factura.id,
        fecha: factura.fecha,
        hora: factura.hora,
        cliente: factura.clienteVenta.nombre,
        email: factura.clienteVenta.email,
        direccion: factura.direccion,
        telefono: factura.clienteVenta.telefono,
        pagado: factura.pagado,
        total: factura.total,
        estado: factura.estado

    }

    const datos = await DetalleVenta.findAll({
        where: {
            venta_id: id
        },
        include: {
            model: Producto,
            as: 'productoDetalleVenta',
            attributes: ['nombre'],
            include: [
                {model: ProductoMarca, as: 'marcaProducto', attributes: ['nombre']},
                {model: ProductoMedida, as: 'medidaProducto', attributes: ['nombre']}

            ]
        }
        
    })

    const datosFormateados = datos.map( dato => {
        return {
            id: dato.producto_id,
            nombre: dato.productoDetalleVenta.nombre,
            marca: dato.productoDetalleVenta.marcaProducto.nombre,
            medida: dato.productoDetalleVenta.medidaProducto.nombre,
            cantidad: parseInt(dato.cantidad),
            precio: parseInt(dato.precio),
            subtotal: parseInt(dato.subtotal)
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