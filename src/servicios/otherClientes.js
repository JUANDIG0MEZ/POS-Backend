const {
    sequelize,
    Cliente,
    Pago,
    //Abono,
    Compra,
    //Venta
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



async function crearPagoFactura(body, idCliente){
    const transaction = await sequelize.transaction()
    try {
        const compra = await Compra.findByPk(body.factura_id, {
            transaction,
            lock: transaction.LOCK.UPDATE
        })
        const porPagar = compra.porPagar

        if (body.valor > porPagar) {
            throw Error("El pago es mayor a la deuda")
        }

        compra.pagado = compra.pagado + body.valor

        crearPago(body.valor, idCliente, transaction)

        transaction.commit()
    }
    catch(error) {
        transaction.rollback()
        throw error
    }
}


async function crearPagosFacturas(body, idCliente){
    const transaction = await sequelize.transaction()
    try {
        const clienteId = body.cliente_id
        let valorPago = body.valor

        const cliente = await Cliente.findByPk(clienteId, {transaction})
        if (valorPago > cliente.por_pagarle){
            throw Error ("El pago es mayor a la deuda")
        }
        const compras = await Compra.findAll({
            where: {
                estado_pago: false,
                cliente_id: clienteId
            },
            attributes: ['id', 'total', 'pagado'],
            order: [['id', 'ASC']],
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
        
        crearPago(valorPago, idCliente, transaction)

        transaction.commit()
    }
    catch (error) {
        transaction.rollback()
        throw error
    }

}


module.exports = {
    crearPagoFactura,
    crearPagosFacturas
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