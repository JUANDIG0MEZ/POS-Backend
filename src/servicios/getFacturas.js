const { Cliente,  VentaEstado, CompraEstado} = require('../database/models')
const { Compra, Venta, DetalleCompra, DetalleVenta, Producto, ProductoMarca, ProductoMedida} = require('../database/models')


const {ClaseFacturaCompra} = require('./facturasCompra/clase')
const { ClaseFacturaVenta } = require('./facturasVenta/clase')

async function cargarEstadosVentas(){
    const estados = await VentaEstado.findAll()

    return estados
}

async function cargarEstadosCompras(){
    const estados = await CompraEstado.findAll()

    return estados
}


async function cargarFacturasCompra(query){

    const {count, rows} = await Compra.findAndCountAll(
        {
            include: ClaseFacturaCompra.incluir(),
            where: ClaseFacturaCompra.where(query),
            attributes: {exclude: ['cliente_id']},
            limit: Number(query.limit),
            offset: Number(query.offset),
            order: [['id', 'DESC']]
        }
    )

    const compras = ClaseFacturaCompra.formatear(rows)

    return {count, rows: compras}
}



async function cargarFacturasVenta(query){

    const {count, rows } = await Venta.findAndCountAll(
        {
            include: ClaseFacturaVenta.incluir(),
            where: ClaseFacturaVenta.where(query),
            attributes: {exclude: ['cliente_id']},
            limit: Number(query.limit),
            offset: Number(query.offset),
            order: [['id', 'DESC']]
        }
    )
    const ventas = ClaseFacturaVenta.formatear(rows)
    return {count, rows: ventas}
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
            as: 'productoDetalleCompra',
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
    cargarFacturaVenta,

    cargarEstadosCompras,
    cargarEstadosVentas
}