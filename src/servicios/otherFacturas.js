const {
    Venta,
    Compra,
    DetalleCompra,
    DetalleVenta,
    sequelize,
    Producto
} = require('../database/models')

// async function crearFacturaVenta(body){
//     const dataVenta = body.info
//     const dataDetalleVenta = body.datos
//     // Una transaccion me permitira hacer varias operaciones en la base de datos y si alguna falla, se deshacen todas
//     const transaction = await sequelize.transaction();
//     try {
//         const nuevaVenta = await Venta.create(dataVenta, {transaction})
//         const detalles = await DetalleVenta.bulkCreate( dataDetalleVenta.map( detalle => {
//             return {
//                 ...detalle,
//                 idVenta: nuevaVenta.id
//             }
//         }), {transaction})
//         await transaction.commit()
//         return {nuevaVenta, detalles}
//     }
//     catch (error){
//         await transaction.rollback()
//         throw new Error('No se pudo crear la factura de venta')
//     }
// }


async function crearFacturaCompra(body){
    const transaction = await sequelize.transaction();

    try {
        const fechaActual = new Date();
        const fechaFormato = fechaActual.toISOString().split('T')[0];
        const horaFormato = fechaActual.toTimeString().split(' ')[0];

        const total = body.datos.reduce((acc, item) => acc + item.subtotal, 0)

        const compra = {
            fecha: fechaFormato,
            hora: horaFormato,
            cliente_id: body.info.cliente_id,
            pagado: body.info.pagado,
            total: total,
            estado_id: body.info.estado_id
        }

        const nuevaCompra = await Compra.create(compra, {transaction})


        // Ahora se agregan los detalles de la compra
        const dataDetalleCompra = body.datos


        const detalles = await DetalleCompra.bulkCreate( dataDetalleCompra.map( detalle => {
            return {
                ...detalle,
                compra_id: nuevaCompra.id
            }
        }), {transaction})

        // Ahora se deben actualizar los productos en el inventario
        for (let i=0; i< dataDetalleCompra.length; i++){
            const producto = await Producto.findByPk(dataDetalleCompra[i].producto_id, {transaction})
            await Producto.update({
                cantidad: producto.cantidad + dataDetalleCompra[i].cantidad
            }, {
                where: {
                    id: dataDetalleCompra[i].producto_id
                },
                transaction
            })
        }

        await transaction.commit()
        return {nuevaCompra, detalles}
    }
    catch (error){
        await transaction.rollback()
        throw error
    }
}


async function modificarCompra(body, idCompra){
    const transaction = await sequelize.transaction();
    // Se van a modificar todos los producto de la compra
    try {

        console.log(body)


        for (let i=0; i< body.length; i++){
            // si se realiza una modificacion de la factura se debe modificar el inventario o stock de los productos.
            // se obtiene el detalle de la compra original
            const detalleOriginal = await DetalleCompra.findOne({
                where: {
                    compra_id: idCompra,
                    producto_id: body[i].producto_id
                },
                transaction
            })

            // se actualiza el detalle de la compra

            await DetalleCompra.update(body[i], {
                where: {
                    compra_id: idCompra,
                    producto_id: body[i].producto_id
                },
                transaction
            })

            // se obtiene la diferencia entre la cantidad original y la nueva cantidad
            const diferencia = detalleOriginal.cantidad -  body[i].cantidad
            const producto = await Producto.findByPk(body[i].producto_id, {transaction})
            // si la diferencia es positiva, se suma al inventario

            // se actualiza el inventario
            await Producto.update({
                cantidad: producto.cantidad - diferencia
            }, {
                where: {
                    id: body[i].producto_id
                },
                transaction
            })
        }
        // se obtiene el total y la cantidad pagada por el cliente de la compra
        const total = body.reduce((acc, item) => acc + item.subtotal, 0)
        const compraOriginal = await Compra.findByPk(idCompra, {transaction})
        const actualiza = {total: total}
        
        if (total <= compraOriginal.pagado){
            actualiza.pagado = total
        }
        await Compra.update(actualiza, {
            where: {
                id: idCompra
            },
            transaction
        })
        await transaction.commit()


        return actualiza
    }
    catch (error){
        await transaction.rollback()
        throw new Error(error)
    }
}

async function modificarVenta(body, idVenta){
    const transaction = await sequelize.transaction();
    // Se van a modificar todos los producto de la compra
    try {
        for (let i=0; i< body.length; i++){
            // si se realiza una modificacion de la factura se debe modificar el inventario o stock de los productos.
            // se obtiene el detalle de la compra original
            const detalleOriginal = await DetalleVenta.findOne({
                where: {
                    venta_id: idVenta,
                    producto_id: body[i].producto_id
                },
                transaction
            })

            // se actualiza el detalle de la compra

            await DetalleVenta.update(body[i], {
                where: {
                    venta_id: idVenta,
                    producto_id: body[i].producto_id
                },
                transaction
            })

            // se obtiene la diferencia entre la cantidad original y la nueva cantidad
            const diferencia = body[i].cantidad - detalleOriginal.cantidad
            const producto = await Producto.findByPk(body[i].producto_id, {transaction})
            // si la diferencia es positiva, se suma al inventario

            // se actualiza el inventario
            await Producto.update({
                cantidad: producto.cantidad - diferencia
            }, {
                where: {
                    id: body[i].producto_id
                },
                transaction
            })
        }
        // se obtiene el total y la cantidad pagada por el cliente de la compra
        const total = body.reduce((acc, item) => acc + item.subtotal, 0)
        const ventaOriginal = await Venta.findByPk(idVenta, {transaction})
        const actualiza = {total: total}
        
        if (total <= ventaOriginal.pagado){
            actualiza.pagado = total
        }
        await Venta.update(actualiza, {
            where: {
                id: idVenta
            },
            transaction
        })
        await transaction.commit()


        return actualiza
    }
    catch (error){
        await transaction.rollback()
        throw new Error(error)
    }
}

module.exports = {
    modificarCompra,
    modificarVenta,
    crearFacturaCompra
}