const {
    Cliente,
    ClienteTipo,
    Venta,
    Compra,
    Abono,
    Pago
} = require('../database/models')

async function cargarClientes(limit, offset){
     
    
    const clientes = await Cliente.findAll({
        include: { model: ClienteTipo, as: 'tipoCliente', attributes: ['nombre']},
        limit: limit,
        offset: offset,
        order: [['id', 'DESC']]
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
            debe: cliente.debe,
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

async function cargarVentaCliente(id, limit, offset){
    // Se traen las ventas al cliente con el id que se recibe
    const {count, rows} = await Venta.findAndCountAll({
        where: {
            cliente_id: id
        },
        include: {
            model: Cliente, as: 'clienteVenta', attributes: ['nombre']
        },
        limit: limit,
        offset: offset,
        order: [['id', 'DESC']]
    })

    const ventasFormateadas = rows.map(venta =>{
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
    return {count, rows: ventasFormateadas}
}


async function cargarCompraCliente(id, limit, offset){
    // Se traen las compras al cliente con el id que se recibe
    const {count, rows } = await Compra.findAndCountAll({
        where: {
            cliente_id: id
        },
        include: { model: Cliente, as: 'clienteCompra', attributes: ['nombre']},
        limit: limit,
        offset: offset,
        order: [['id', 'DESC']]
    })

    const comprasFormateadas = rows.map(compra =>{
        return {
            id: compra.id,
            fecha: compra.fecha,
            hora: compra.hora,
            cliente: compra.clienteCompra.nombre,
            por_pagar: compra.por_pagar,
            total: compra.total,
            estado: compra.estado
        }})
    

    return {count, rows: comprasFormateadas}
}


async function cargarAbonosCliente(id, limit, offset){
    // Se traen los abonos al cliente con el id que se recibe
    const {count, rows} = await Abono.findAll({
        where: {
            cliente_id: id
        },
        limit: limit,
        offset: offset,
        order: [['id', 'DESC']]
    })
     return {count, rows}
}

async function cargarPagosCliente(id, limit, offset){
    // Se traen los pagos al cliente con el id que se recibe
    const {count, rows} = await Pago.findAll({
        where: {
            cliente_id: id
        },
        limit: limit,
        offset: offset,
        order: [['id', 'DESC']]
    })
     return {count, rows}
}

module.exports = {
    cargarClientes,
    cargarCliente,
    cargarVentaCliente,
    cargarCompraCliente,
    cargarAbonosCliente,
    cargarPagosCliente
}