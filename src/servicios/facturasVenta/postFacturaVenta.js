
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
