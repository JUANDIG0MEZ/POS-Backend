const {faker} = require('@faker-js/faker')

function cargarProductos() {
    const productos = []
    for (let i = 0; i < 50; i++) {
        productos.push({
            nombre: faker.commerce.productName(),
            marca_id: faker.number.int({min: 1, max: 4}),
            categoria_id: faker.number.int({min: 1, max: 4}),
            medida_id: faker.number.int({min: 1, max: 4}),
            precio_compra: parseInt(faker.commerce.price({min: 10000, max: 50000})),
            precio_venta: parseInt(faker.commerce.price({min: 50000, max: 100000})),
            cantidad: faker.number.int({min: 1, max: 100}),
            total: faker.number.int({min: 100000000, max: 100000000000})
            })
    }
    return productos

}

function cargarClientes() {
    const clientes = []

    for (let i = 0; i < 200; i++) {
        clientes.push({
            nombre: faker.person.fullName(),
            direccion: faker.location.streetAddress(),
            telefono: faker.helpers.arrayElement([3000000000, 3100000000, 3200000000, 3500000000]),
            email: faker.internet.email(),
            tipo_id: faker.number.int({min: 1, max: 3}),
            por_pagarle: faker.number.int({min: 10000, max: 50000}),
            debe: faker.number.int({min: 10000, max: 50000})           
        })
    }
    return clientes
}

function cargarCliente(id){
    return {
        id: id,
        nombre: faker.person.fullName(),
        direccion: faker.location.streetAddress(),
        telefono: faker.phone.number(),
        email: faker.internet.email(),
        tipo: faker.helpers.arrayElement(['Proveedor', 'Cliente', 'Ambos']),
        por_pagarle: faker.finance.amount(),
        debe: faker.finance.amount()            
    }
}

function cargarMedidas() {
    return [
        {nombre: 'kG'}, 
        {nombre: "UniDad"}, 
        {nombre: "Litro"}, 
        {nombre: "Metro"},
        {nombre: "Gramo"},
        {nombre: "Mililitro"},
        {nombre: "Centimetro"}
    ]
}


function cargarCategorias() {
    const lista = ['Alimentos', 'Bebidas', 'Limpieza', 'Hogar', 'Electrodomesticos']
    const categorias = []
    for (let i = 0; i < lista.length; i++) {
        categorias.push({
            nombre: lista[i]
        })
    }
    return categorias
}

function cargarMarcas() {
    const marcas = []
    for (let i = 0; i < 30; i++) {
        marcas.push({
            nombre: faker.company.name()
        })
    }
    return marcas
}

function tiposClientes() {
    const lista = ['Proveedor', 'Cliente', 'Ambos']
    const tipos = []
    lista.forEach(tipo => 
        tipos.push({nombre: tipo})
    )
    return tipos
}

function cargarFacturasCompra(){
    const facturas = []
        for (let i = 0; i < 10; i++) {
            const fecha = faker.date.recent();
            facturas.push({
                fecha: fecha.toISOString().split('T')[0],
                hora: fecha.toTimeString().split(' ')[0],  
                cliente_id: faker.number.int({min: 1, max: 10}),
                por_pagar: faker.finance.amount(),
                total: faker.finance.amount(),
                estado: faker.helpers.arrayElement(['Entregado', 'Por entregar']),
            })
        }
    return facturas
}

function cargarFacturasVenta(){
    const facturas = []
        for (let i = 0; i < 10; i++) {
            const fecha = faker.date.recent();
            facturas.push({
                fecha: fecha.toISOString().split('T')[0], // Formato YYYY-MM-DD (DATEONLY en Sequelize)
                hora: fecha.toTimeString().split(' ')[0], // Formato HH:MM:SS (TIME en Sequelize)   
                cliente_id: faker.number.int({min: 1, max: 10}),
                direccion: faker.location.streetAddress(),
                por_pagar: faker.finance.amount(),
                total: faker.finance.amount(),
                estado: faker.helpers.arrayElement(['Entregado', 'Por entregar']),
            })
        }
    return facturas
}

function facturaCompra(id){
    const facturas ={
        info: {},
        data: []
    }


    facturas.info = {
        id: id,
        fecha: "23/12/2023",
        nombre: "juan diego gomez",
        direccion: faker.location.streetAddress(),
        telefono: faker.phone.number(),
        email: faker.internet.email(),
        estado: faker.helpers.arrayElement(['Entregado', 'Por entregar']),
        por_pagar: faker.finance.amount(),
        total: faker.finance.amount()
    }


    for (let i = 0; i<10; i++){
        facturas.data.push({
            id: i, 
            nombre: faker.commerce.productName(),
            cantidad: faker.number.int({min: 1, max: 100}),
            precio: faker.commerce.price({min: 10000, max: 50000}),
            total: faker.commerce.price({min: 10000, max: 50000})
        })
    }
    return facturas
}



function facturaVenta(id){
    const facturas ={
        info: {},
        data: []
    }


    facturas.info = {
        id: id,
        fecha: "23/12/2023",
        nombre: "juan diego gomez",
        direccion: faker.location.streetAddress(),
        telefono: faker.phone.number(),
        email: faker.internet.email(),
        estado: faker.helpers.arrayElement(['Entregado', 'Por entregar']),
        por_pagar: faker.finance.amount(),
        total: faker.finance.amount()
    }


    for (let i = 0; i<10; i++){
        facturas.data.push({
            id: i, 
            nombre: faker.commerce.productName(),
            cantidad: faker.number.int({min: 1, max: 100}),
            precio: faker.commerce.price({min: 10000, max: 50000}),
            total: faker.commerce.price({min: 10000, max: 50000})
        })
    }
    return facturas
}

function cargarAbonos(){
    const facturas = []
    for(let i = 0; i < 100; i++){
        const fecha = faker.date.recent();
        facturas.push({
            fecha: fecha.toISOString().split('T')[0],
            hora: fecha.toTimeString().split(' ')[0], 
            cliente_id: faker.number.int({min: 1, max: 10}),
            valor: faker.number.int({min: 10000, max: 50000}),
            
        }   
        )
    }
    return facturas

}


function cargarPagos(){
    const facturas = []
    for(let i = 0; i < 100; i++){
        const fecha = faker.date.recent();
        facturas.push({
            fecha: fecha.toISOString().split('T')[0],
            hora: fecha.toTimeString().split(' ')[0], 
            cliente_id: faker.number.int({min: 1, max:10}),
            valor: faker.number.int({min: 10000, max: 50000}),
            
        }   
        )
    }
    return facturas
}

module.exports = {
    cargarProductos,
    cargarClientes,
    cargarMedidas,
    cargarCategorias,
    cargarMarcas,
    tiposClientes,
    cargarFacturasCompra,
    cargarFacturasVenta,
    facturaCompra,
    facturaVenta,
    cargarCliente,
    cargarAbonos,
    cargarPagos
}