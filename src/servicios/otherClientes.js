const {
    sequelize,
    Cliente,
    Pago,
    //Abono,
    Compra,
    //Venta
    } = require('../database/models');

// async function crearCliente(datos){
//     const cliente = await Cliente.create(datos);
//     return cliente;
// }

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

    const cliente = await Cliente.findByPk(idCliente)
    const porPagar = cliente.por_pagarle - valor
    const actualizar = {
        por_pagarle: porPagar
    }
    await Cliente.update(actualizar, {
        where: {
            id: idCliente
        }
    }, {transaction})

}



async function crearPagoFactura(body, idCliente){
    const transaction = await sequelize.transaction()
    try {
        const compraAntes = await Compra.findByPk(body.factura_id)
        const porPagar = compraAntes.porPagar

        if (body.valor > porPagar) {
            throw Error("El pago es mayor a la deuda")
        }

        const pagado = compraAntes.pagado + body.valor

        const actualizar = {
            pagado: pagado
        }

        await Compra.update(actualizar, {
            where: {
                id: compraAntes.id
            }
        }, {transaction})


        crearPago(body.valor, idCliente, transaction)

        transaction.commit()

        return actualizar
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
        const cliente = await Cliente.findByPk({idCliente})

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
            raw: true
        })

        let valorRestante = valorPago


        for (let i = 0; i<compras.length; i++){
            const compra = compras[i]
            const id = compra.id
            const porPagar = compra.por_pagar

            if (valorRestante < porPagar){
                const nuevoPagado = compra.pagado + valorRestante
                await Compra.update({pagado: nuevoPagado}, {where: {id: id}}, {transaction})
                break
            }
            valorRestante = valorRestante - porPagar
            await Compra.update({pagado: compra.total}, {
                where: { id: id}}, {transaction})
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