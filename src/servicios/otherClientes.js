const {
    sequelize,
    Cliente,
    Pago,
    Abono,
    Compra,
    Venta
    } = require('../database/models');



async function crearPago(valor, idCliente, transaction){
    const fecha = new Date().toISOString().split('T')[0]
    const hora = new Date().toTimeString().split(' ')[0]

    const data = {
        cliente_id: idCliente,
        fecha,
        hora,
        valor
    }

    await Pago.create(data, {transaction})
}

async function crearAbono(valor, idCliente, transaction) {
    const fecha = new Date().toISOString().split('T')[0]
    const hora = new Date().toTimeString().split(' ')[0]

    const data = {
        cliente_id: idCliente,
        fecha,
        hora,
        valor
    }

    await Abono.create(data, {transaction})
}


async function crearPagoFactura(body, id_factura){
    const transaction = await sequelize.transaction()
    try {

        const valor = parseInt(body.valor)

        const compra = await Compra.findByPk(id_factura, {
            transaction,
            lock: transaction.LOCK.UPDATE
        })
        const porPagar = compra.por_pagar

        if (valor > porPagar) {
            throw Error("El pago es mayor a la deuda")
        }


        compra.pagado = compra.pagado + valor
        await compra.save({transaction})
 
        await crearPago(valor, compra.cliente_id, transaction)

        await transaction.commit()
        return {
            pagado : compra.pagado
        }
    }
    catch(error) {
        await transaction.rollback()
        throw error
    }
}



async function crearAbonoFactura(body, id_factura){
    const transaction = await sequelize.transaction()
    try {


        const valor = parseInt(body.valor)

        const venta = await Venta.findByPk(id_factura, {
            transaction,
            lock: transaction.LOCK.UPDATE
        })


        if (valor > venta.por_pagar) {
            throw Error("El abono es mayor a la deuda")
        }
        venta.pagado = venta.pagado + valor

        await venta.save({transaction})
        await crearAbono(valor, venta.cliente_id, transaction)
        await transaction.commit()

        return {
            pagado : venta.pagado
        }
    }
    catch(error) {
        await transaction.rollback()
        throw error
    }
}



async function crearPagosFacturas(body, idCliente){
    const transaction = await sequelize.transaction()
    try {
        let valorPago = parseInt(body.valor)

        

        const cliente = await Cliente.findByPk(idCliente, {transaction})
        if (valorPago > cliente.por_pagarle){
            throw Error ("El pago es mayor a la deuda")
        }
        
        const compras = await Compra.findAll({
            where: {
                estado_pago: false,
                cliente_id: idCliente
            },
            attributes: ['id', 'total', 'pagado', 'por_pagar', 'cliente_id'],
            order: [['id', 'ASC']],
            transaction,
            lock: transaction.LOCK.UPDATE
        })


        let valorRestante = valorPago
        for (const compra of compras){
            const porPagar = compra.por_pagar

            if (valorRestante <= porPagar){
                compra.pagado = compra.pagado + valorRestante
                await compra.save({transaction})
                break
            }
            else {
                valorRestante = valorRestante - porPagar
                compra.pagado = compra.total
                await compra.save({transaction})
            }
            
        }
        
        await cliente.reload({transaction})

        await crearPago(valorPago, idCliente, transaction)

        await transaction.commit()
        return {
            por_pagarle: cliente.por_pagarle,
        }
    }
    catch (error) {
        await transaction.rollback()
        throw error
    }

}

async function crearAbonosFacturas(body, idCliente){
    const transaction = await sequelize.transaction()
    try {
        let valorPago = parseInt(body.valor)

        const cliente = await Cliente.findByPk(idCliente, {transaction})

        if (valorPago > cliente.debe){
            
            throw Error ("El abono es mayor a la deuda")
        }

        const ventas = await Venta.findAll({
            where: {
                estado_pago: false,
                cliente_id: idCliente
            },
            attributes: ['id', 'total', 'pagado', 'por_pagar', 'cliente_id'],
            order: [['id', 'ASC']],
            transaction,
            lock: transaction.LOCK.UPDATE
        })

        let valorRestante = valorPago

        for (const venta of ventas){
            const porPagar = venta.por_pagar

            if (valorRestante <= porPagar){
                venta.pagado = venta.pagado + valorRestante
                await venta.save({transaction})
                break
            }
            else {
                valorRestante = valorRestante - porPagar
                venta.pagado = venta.total
                await venta.save({transaction})
            }
            
        }
        
        await cliente.reload({transaction})

        await crearAbono(valorPago, idCliente, transaction)

        await transaction.commit()
        return {
            debe: cliente.debe,
        }
    }
    catch (error) {
        await transaction.rollback()
        throw error
    }

}


module.exports = {
    crearPagoFactura,
    crearPagosFacturas,
    crearAbonoFactura,
    crearAbonosFacturas,
}

// async function crearAbono(datos){
//     const abono = await Abono.create(datos);
//     return abono;
// }

// module.exports = {
//     crearCliente,
//     crearPago,
//     crearAbono
// };