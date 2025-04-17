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
        include: { model: ClienteTipo, as: 'tipoCliente', attributes: ['nombre']},
    })

    const clientesFormateados = clientes.map(cliente =>{
        return {
            id: cliente.id,
            nombre: cliente.nombre,
            direccion: cliente.direccion,
            telefono: cliente.telefono,
            email: cliente.email,
            tipo: cliente.tipoCliente.nombre,
            por_pagarle: cliente.por_pagarle,
            debe: cliente.debe
        }
    })

    return clientesFormateados
}

async function cargarCliente(id){
    const cliente = await Cliente.findByPk(id, {
        include: { model: ClienteTipo, as: 'tipoCliente', attributes: ['nombre']}
    })
    const clienteFormateado = {
        id: cliente.id,
        nombre: cliente.nombre,
        direccion: cliente.direccion,
        telefono: cliente.telefono,
        email: cliente.email,
        tipo: cliente.tipoCliente.nombre,
        por_pagarle: cliente.por_pagarle,
        debe: cliente.debe
    }

    return clienteFormateado
}

async function cargarVentaCliente(id){
    // Se traen las ventas al cliente con el id que se recibe
    const ventas = await Venta.findAll({
        where: {
            cliente_id: id
        },
        include: {
            model: Cliente, as: 'clienteVenta', attributes: ['nombre']
        }
    })

    const ventasFormateadas = ventas.map(venta =>{
        return {
            id: venta.id,
            fecha: venta.fecha,
            hora: venta.hora,
            cliente: venta.clienteVenta.nombre,
            por_pagar: venta.por_pagar,
            total: venta.total,
            estado: venta.estado,
            
        }
    })
    return ventasFormateadas
}


async function cargarCompraCliente(id){
    // Se traen las compras al cliente con el id que se recibe
    const compras = await Compra.findAll({
        where: {
            cliente_id: id
        },
        include: { model: Cliente, as: 'clienteCompra', attributes: ['nombre']}
    })

    const comprasFormateadas = compras.map(compra =>{
        return {
            id: compra.id,
            fecha: compra.fecha,
            hora: compra.hora,
            cliente: compra.clienteCompra.nombre,
            por_pagar: compra.por_pagar,
            total: compra.total,
            estado: compra.estado
        }})
    

    return comprasFormateadas
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