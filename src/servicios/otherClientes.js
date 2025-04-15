const {
    sequelize,
    Cliente, Pago, Abono, Compra, Venta} = require('../database/models');

// async function crearCliente(datos){
//     const cliente = await Cliente.create(datos);
//     return cliente;
// }

async function crearPagoFactura(datos){
    const transaction = await sequelize.transaction()
    try {
        const compraAntes = await Compra.findByPk(datos.factura_id)
        const porPagar = compraAntes.total - compraAntes.pagado

        if (datos.valor > porPagar) {
            throw Error("El abono no puede ser mayor al total a pagar")
        }

        const pagado = compraAntes.pagado + datos.valor
        const estado = pagado == compraAntes.total ? true : false

        const actualizar = {
            pagado: pagado,
            estado_pago: estado
        }

        await Compra.update(actualizar, {
            where: {
                id: compraAntes.id
            }
        }, {transaction})

        transaction.commit()


        return actualizar
        

    }
    catch(error) {
        transaction.rollback()
        throw error
    }
}


async function crearPago(datos){
    const transaction = await sequelize.transaction()
    try {
        
        const clienteId = datos.cliente_id
        let valorPago = datos.valor
        
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
            const total = compra.total
            const pagado = compra.pagado

            const porPagar = total - pagado

        }


        


        transaction.commit()
    }
    catch (error) {
        transaction.rollback()
        throw error
    }

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