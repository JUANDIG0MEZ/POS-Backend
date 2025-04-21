const {
    Venta,
    Compra,
    DetalleCompra,
    DetalleVenta,
    sequelize,

} = require('../database/models')


async function crearFacturaCompra(body){
    const transaction = await sequelize.transaction();

    try {
        const fechaActual = new Date();
        const fechaFormato = fechaActual.toISOString().split('T')[0];
        const horaFormato = fechaActual.toTimeString().split(' ')[0];

        const infoCompra = {
            fecha: fechaFormato,
            hora: horaFormato,
            cliente_id: body.info.cliente_id,
            estado_id: body.info.estado_id
        }

        const compra = await Compra.create(infoCompra, {transaction})
        const dataDetalles = body.datos

        // Agregar los detalles de la compra
        for ( const detalle of dataDetalles){
            await DetalleCompra.create({
                ...detalle,
                compra_id: compra.id
            }, {transaction})
        }

        await compra.reload({transaction})
        compra.pagado = body.info.pagado || 0
        await compra.save({transaction})

        await transaction.commit()
        return {facturaCreada: true}
    }
    catch (error){
        await transaction.rollback()
        throw error
    }
}


async function crearFacturaVenta(body){
    const transaction = await sequelize.trasaction()

    try {
        const fechaActual = new Date();
        const fechaFormato = fechaActual.toISOString().split('T')[0];
        const horaFormato = fechaActual.toTimeString().split(' ')[0];

        const infoVenta = {
            fecha: fechaFormato,
            hora: horaFormato,
            cliente_id: body.info.cliente_id,
            estado_id: body.info.estado_id
        }

        const venta = await Venta.create(infoVenta, {transaction})

        const dataDetalles = body.datos
        // Agregar los detalles de la compra
        for ( const detalle of dataDetalles){
            await DetalleVenta.create({
                ...detalle,
                venta_id: venta.id
            }, {transaction})
        }

        await venta.reload({transaction})
        venta.pagado = body.info.pagado || 0
        await venta.save({transaction})

        await transaction.commit()
        return {facturaCreada: true}
    }
    catch (error) {
        await transaction.rollback()
        throw new Error(error)
    }
}


async function modificarCompra(body, idCompra){
    const transaction = await sequelize.transaction();
    // Se van a modificar todos los producto de la compra
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
                detalle.cantidad = dataDetalle.cantidad
            }
            if (dataDetalle.precio !== undefined){
                detalle.precio = dataDetalle.precio
            }
            await detalle.save({transaction})
        }

        const compra = await Compra.findByPk(idCompra, {transaction})
        const resData = {
            pagado: compra.pagado,
            total: compra.total,
            por_pagar: compra.por_pagar

        }


        await transaction.commit()


        return resData
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
                detalle.cantidad = dataDetalle.cantidad
            }
            if (dataDetalle.precio !== undefined){
                detalle.precio = dataDetalle.precio
            }   
            await detalle.save({transaction})
        }
        await transaction.commit()


        return {cambiosRealizados: true}
    }
    catch (error){
        await transaction.rollback()
        throw new Error(error)
    }
}

module.exports = {
    crearFacturaCompra,
    crearFacturaVenta,
    modificarCompra,
    modificarVenta,
    
}