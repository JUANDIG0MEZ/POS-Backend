const {
    Compra,
    Venta,
    Cliente,
    sequelize
} = require('../database/models')

async function sincronizarDeudasCompras(cliente, transaction) {
    const compras = await Compra.findAll({
        where: {
            estado_pago: false,
            cliente_id: cliente.id
        },
        attributes: ['id','por_pagar'],
        transaction
    })


    let total = compras.reduce((total, compra) => total + compra.por_pagar, 0 )


    console.log(`${cliente.id} POR PAGARLE: ${cliente.por_pagarle} => ${total}`)

    cliente.por_pagarle = total

    await cliente.save({
        transaction
    })


}

async function sincronizarDeudasVentas(cliente, transaction){
    const ventas = await Venta.findAll({
        where: {
            estado_pago: false,
            cliente_id: cliente.id
        },
        attributes: ['id','por_pagar'],
        transaction
    })


    let total = ventas.reduce((total, venta) => total + venta.por_pagar, 0 )

    console.log(`${cliente.id} DEBE: ${cliente.debe} => ${total}`)

    cliente.debe = total
    
    await cliente.save({
        transaction
    })
}


async function sincronizarDeudasClientes() {
    const transaction = await sequelize.transaction()
    try {
        
        const clientes = await Cliente.findAll({attributes: ['id', 'por_pagarle', 'debe'], transaction})

        for (const cliente of clientes) {
            await sincronizarDeudasCompras(cliente, transaction)
            await sincronizarDeudasVentas(cliente, transaction)
        }

        await transaction.commit()
    }
    catch(error) {
        await transaction.rollback()
        throw error
    }
}

if (require.main === module){
    // Si el archivo se ejecuta directamente, se sincronizan las deudas de todos los clientes
    sincronizarDeudasClientes()
        .then(() => {
            console.log('Sincronización de deudas completada')
        })
        .catch((error) => {
            console.error('Error al sincronizar deudas:', error)
        })
}

