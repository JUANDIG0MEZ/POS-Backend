const {
    Compra,
    Venta,
    Cliente,
    DetalleCompra,
    DetalleVenta,
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


async function sincronizarDeudasClientes(transaction) {
    const clientes = await Cliente.findAll({attributes: ['id', 'por_pagarle', 'debe'], transaction})

    for (const cliente of clientes) {
        await sincronizarDeudasCompras(cliente, transaction)
        await sincronizarDeudasVentas(cliente, transaction)
    }

}



async function sincronizarDetallesCompras(transaction){
    const compras = await Compra.findAll({transaction})
    for (const compra of compras) {
        const detalles = await DetalleCompra.findAll({
            where: {
                compra_id: compra.id
            },
            transaction
        })

        const totalDetalle = detalles.reduce((total, detalle) => total + parseInt(detalle.subtotal), 0)
        compra.total = totalDetalle
        console.log(`Compra ${compra.id} total: ${totalDetalle}`)
        await compra.save({transaction})
}}



async function sincronizarDetallerVentas(transaction){
    const ventas = await Venta.findAll({transaction})
    for (const venta of ventas) {
        const detalles = await DetalleVenta.findAll({
            where: {
                venta_id: venta.id
            },
            transaction
        })

        const totalDetalle = detalles.reduce((total, detalle) => total + parseInt(detalle.subtotal), 0)

        venta.total = totalDetalle
        await venta.save({transaction})
    }
}



async function sincronizarTodo() {
    const transaction = await sequelize.transaction()
    try {  
        await sincronizarDetallesCompras(transaction)
        console.log('Sincronizando detalles de compras')
        await sincronizarDetallerVentas(transaction)
        console.log('Sincronizando detalles de ventas')
        await sincronizarDeudasClientes(transaction)
        
        await transaction.commit()
    }
    catch(error) {
        await transaction.rollback()
        throw error
    }
}




if (require.main === module){
    // Si el archivo se ejecuta directamente, se sincronizan las deudas de todos los clientes
    sincronizarTodo()
        .then(() => {
            console.log('Sincronización de deudas completada')
        })
        .catch((error) => {
            console.error('Error al sincronizar deudas:', error)
        })
}

