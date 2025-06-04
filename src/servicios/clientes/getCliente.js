const {
    ClienteTipo,
    Cliente,
    ClaseCliente,
    Abono,
    Pago
} = require('../../database/models')


async function cargarTiposClientes(){
    const tipos = await ClienteTipo.findAll()
    return tipos
}


async function cargarClientesNombres(){
    const clientes = await Cliente.findAll({
        attributes: ['id', 'nombre'],
        order: [['nombre', 'ASC']]
    })

    return clientes.map(cliente => {
        return {
            id: cliente.id,
            nombre: cliente.nombre
        }
    })

}



async function cargarClientes(query){
     
    console.log('Cargando clientes con query:', query)
    const {count, rows } = await Cliente.findAndCountAll({
        include: ClaseCliente.incluir(),
        where: ClaseCliente.where(query),
        limit: Number(query.limit) || 25,
        offset: Number(query.offset) || 0,
        order: ClaseCliente.order(query)    
    })

    const clientesFormateados = ClaseCliente.formatear(rows)

    return {count, rows: clientesFormateados}
}



async function cargarAbonosCliente(id, limit, offset){
    // Se traen los abonos al cliente con el id que se recibe
    const {count, rows} = await Abono.findAndCountAll({
        where: {
            cliente_id: id
        },
        attributes: {
            exclude: ['cliente_id']
        },
        limit: limit,
        offset: offset,
        order: [['id', 'DESC']]
    })
     return {count, rows}
}

async function cargarPagosCliente(id, limit, offset){
    // Se traen los pagos al cliente con el id que se recibe
    const {count, rows} = await Pago.findAndCountAll({
        where: {
            cliente_id: id
        },
        attributes: {
            exclude: ['cliente_id']
        },
        limit: limit,
        offset: offset,
        order: [['id', 'DESC']]
    })
     return {count, rows}
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




module.exports = {
    cargarTiposClientes,
    cargarClientesNombres,
    cargarClientes,
    cargarAbonosCliente,
    cargarPagosCliente,
    cargarCliente
}
