const {
    Venta,
    Compra,
    DetalleCompra,
    sequelize
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


// async function crearFacturaCompra(body){
//     const dataCompra = body.info
//     const dataDetalleCompra = body.datos
//     // Una transaccion me permitira hacer varias operaciones en la base de datos y si alguna falla, se deshacen todas
//     const transaction = await sequelize.transaction();
//     try {
//         const nuevaCompra = await Compra.create(dataCompra, {transaction})
//         const detalles = await DetalleCompra.bulkCreate( dataDetalleCompra.map( detalle => {
//             return {
//                 ...detalle,
//                 idCompra: nuevaCompra.id
//             }
//         }), {transaction})
//         await transaction.commit()
//         return {nuevaCompra, detalles}
//     }
//     catch (error){
//         await transaction.rollback()
//         throw new Error('No se pudo crear la factura de compra')
//     }
// }


async function modificarCompra(body, idCompra){
    const transaction = await sequelize.transaction();
    // Se van a modificar todos los producto de la compra\
    const total = body.reduce((acc, item) => acc + item.subtotal, 0)
    console.log(total)
    try {
        for (let i=0; i< body.length; i++){

            await DetalleCompra.update(body[i], {
                where: {
                    compra_id: idCompra,
                    producto_id: body[i].producto_id
                },
                transaction
            })
            
        }
        // Se actualiza el total de la compra
        await Compra.update({total: total}, {
            where: {
                id: idCompra
            },
            transaction
        })

        await transaction.commit()
        return true
    }
    catch (error){
        await transaction.rollback()
        throw new Error(error)
    }
}

module.exports = {
    modificarCompra
}