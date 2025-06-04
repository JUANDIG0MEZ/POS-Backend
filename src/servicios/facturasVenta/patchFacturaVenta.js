


async function modificarVenta(body, idVenta){
    const transaction = await sequelize.transaction();
    // Se van a modificar todos los producto de la compra
    try {

        const permisos = {modificar : true}

        if (!permisos.modificar){
            throw new Error("No tienes permisos para modificar la venta")
        }

        for (const dataDetalle of body){
            const detalle = await DetalleVenta.findOne({
                where: {
                    venta_id: idVenta,
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

        const venta = await Venta.findByPk(idVenta,{transaction})
        const info = {
            pagado: venta.pagado,
            total: venta.total,
            por_pagar: venta.por_pagar,
            estado_id: venta.estado_id,
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
