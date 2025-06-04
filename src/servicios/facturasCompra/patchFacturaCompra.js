const {
    sequelize,

    DetalleCompra,
    Compra,


} = require('../../database/models')


async function modificarCompra(body, idCompra){
    const transaction = await sequelize.transaction();
    
    try {


        for (const dataDetalle of body){
            const detalle = await DetalleCompra.findOne({
                where: {
                    compra_id: idCompra,
                    producto_id: dataDetalle.producto_id
                },
                transaction,
                lock: transaction.LOCK.UPDATE
            })
            if (dataDetalle.cantidad !== undefined){
                detalle.cantidad = parseInt(dataDetalle.cantidad)
            }
            if (dataDetalle.precio !== undefined){
                detalle.precio = parseInt(dataDetalle.precio)
            }
            await detalle.save({transaction})
        }

        const compra = await Compra.findByPk(idCompra, {transaction})
        const info = {
            pagado: compra.pagado,
            total: compra.total,
            por_pagar: compra.por_pagar,
            estado_id: compra.estado_id,
        }


        await transaction.commit()
        return {
            info
        }
    }
    catch (error){
        await transaction.rollback()
        throw new Error(error)
    }
}



module.exports = {
    modificarCompra
}