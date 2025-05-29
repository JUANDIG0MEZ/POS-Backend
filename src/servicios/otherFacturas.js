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

        const compraNueva = {
            fecha: fechaFormato,
            hora: horaFormato,
            cliente_id: body.info.cliente_id,
            estado_id: body.info.estado_id
        }

        const compra = await Compra.create(compraNueva, {transaction})


        const dataDetalles = body.datos

        // Agregar los detalles de la compra
        for ( const detalle of dataDetalles){
            await DetalleCompra.create({
                ...detalle,
                compra_id: compra.id
            }, {transaction})
        }

        await compra.reload({transaction})

        if (body.info.pagado) {
            compra.pagado = parseInt(body.info.pagado)
        }



        await compra.save({transaction})

        await transaction.commit()
        return {
            factura: compra,
        }
    }
    catch (error){
        await transaction.rollback()
        throw error
    }
}


async function crearFacturaVenta(body){
    const transaction = await sequelize.transaction();

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
        
        if (body.info.pagado) {
            venta.pagado = parseInt(body.info.pagado)
        }

        await venta.save({transaction})

        await transaction.commit()
        return {
            factura: venta
        }
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

module.exports = {
    crearFacturaCompra,
    crearFacturaVenta,
    modificarCompra,
    modificarVenta,
    
}