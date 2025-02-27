const {
    Cliente,
    ClienteTipo,
    Venta,
    Compra,
    Abono,
    Pago
} = require('../database/models')

async function cargarClientes(){
    const clientes = await Cliente.findAll({
        include: { model: ClienteTipo, as: 'tipo', attributes: ['nombre']},
    })

    const clientesFormateados = clientes.map(cliente =>{
        return {
            id: cliente.id,
            nombre: cliente.nombre,
            direccion: cliente.direccion,
            telefono: cliente.telefono,
            email: cliente.email,
            tipo: cliente.tipo.nombre,
            por_pagarle: cliente.por_pagarle,
            debe: cliente.debe
        }
    })

    return clientesFormateados
}

async function cargarCliente(id){
    const cliente = await Cliente.findByPk(id, {
        include: { model: ClienteTipo, as: 'tipo', attributes: ['nombre']}
    })
    console.log(cliente)
    const clienteFormateado = {
        id: cliente.id,
        nombre: cliente.nombre,
        direccion: cliente.direccion,
        telefono: cliente.telefono,
        email: cliente.email,
        tipo: cliente.tipo.nombre,
        por_pagarle: cliente.por_pagarle,
        debe: cliente.debe
    }
    console.log(clienteFormateado)
    return clienteFormateado
}

async function cargarVentaCliente(id){
    // Se traen las ventas al cliente con el id que se recibe
    const ventas = await Venta.findAll({
        where: {
            cliente_id: id
        }
    })
    return ventas
}


async function cargarCompraCliente(id){
    // Se traen las compras al cliente con el id que se recibe
    const compras = await Compra.findAll({
        where: {
            cliente_id: id
        }
    })
    return compras
}


async function cargarAbonosCliente(id){
    // Se traen los abonos al cliente con el id que se recibe
    const abonos = await Abono.findAll({
        where: {
            cliente_id: id
        }
    })
    return abonos
}

async function cargarPagosCliente(id){
    // Se traen los pagos al cliente con el id que se recibe
    const pagos = await Pago.findAll({
        where: {
            cliente_id: id
        }
    })
    return pagos
}

module.exports = {
    cargarClientes,
    cargarCliente,
    cargarVentaCliente,
    cargarCompraCliente,
    cargarAbonosCliente,
    cargarPagosCliente
}