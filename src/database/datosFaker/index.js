const {faker} = require('@faker-js/faker')


const numeroMedidas = 7
const numeroCategorias = 5
const numeroMarcas = 30
const numeroProductos = 5000

const numeroTiposClientes = 3
const numeroClientes = 200



const numeroEstadoCompras = 2
const numeroCompras = 40

const numeroEstadoVentas =2
const numeroVentas = 40


const numeroAbonos = 200
const numeroPagos = 200

function cargarMedidas() {
    const lista = ['kG', 'UniDad', 'Litro', 'Metro', 'Gramo', 'Mililitro', 'Centimetro']
    const medidas = []
    for (let i = 0; i < numeroMedidas; i++) {
        medidas.push({
            nombre: lista[i]
        })
    }
    return medidas
}


function cargarCategorias() {
    const lista = ["",'Alimentos', 'Bebidas', 'Limpieza', 'Hogar', 'Electrodomesticos']
    const categorias = []
    for (let i = 0; i < numeroCategorias; i++) {
        categorias.push({
            nombre: lista[i]
        })
    }
    return categorias
}

function cargarMarcas() {
    const lista = faker.helpers.uniqueArray(faker.company.name, numeroMarcas)
    const marcas = []
    for (let i = 0; i < numeroMarcas; i++) {
        marcas.push({
            nombre: lista[i]
        })
    }
    return marcas
}


function cargarProductos() {
    const nombre = faker.helpers.uniqueArray(faker.commerce.productName, numeroProductos)
    const productos = []
    for (let i = 0; i < numeroProductos; i++) {
        productos.push({
            nombre: nombre[i],
            marca_id: faker.number.int({min: 1, max: numeroMarcas}),
            categoria_id: faker.number.int({min: 1, max: numeroCategorias}),
            medida_id: faker.number.int({min: 1, max: numeroMedidas}),
            precio_compra: faker.number.int({min: 10000, max: 50000}),
            precio_venta: faker.number.int({min: 50000, max: 100000}),
            cantidad: faker.number.int({min: 1, max: 100}),
            total: faker.number.int({min: 100000000, max: 100000000000})
            })
    }
    return productos
}


function cargarTiposCliente() {
    const lista = ['Proveedor', 'Cliente', 'Ambos']
    const tipos = []
    for(let i = 0; i < numeroTiposClientes; i++) {
        tipos.push({
            nombre: lista[i]
        })
    }
    return tipos
}


function cargarClientes() {
    const nombre = faker.helpers.uniqueArray(faker.person.fullName, numeroClientes)
    
    const clientes = []

    for (let i = 0; i < numeroClientes; i++) {
        clientes.push({
            nombre: nombre[i],
            direccion: faker.location.streetAddress(),
            telefono: faker.helpers.arrayElement([3000000000, 3100000000, 3200000000, 3500000000]),
            email: faker.internet.email(),
            tipo_id: faker.number.int({min: 1, max: numeroTiposClientes}),
            por_pagarle: 0,
            debe: 0         
        })
    }
    return clientes
}

function cargarEstadosCompra() {
    const lista = ['Recibido', 'No recibido']
    const estados = []
    for (let i = 0; i < numeroEstadoCompras; i++) {
        estados.push({
            nombre: lista[i]
        })
    }
    return estados
}

function cargarFacturasCompra(){
    const facturas = []
        for (let i = 0; i < numeroCompras; i++) {
            const fecha = faker.date.recent();
            facturas.push({
                fecha: fecha.toISOString().split('T')[0],
                hora: fecha.toTimeString().split(' ')[0],  
                cliente_id: faker.number.int({min: 1, max: numeroClientes}),
                pagado: 0,
                total: 0,
                estado_id: faker.number.int({min: 1, max: numeroEstadoCompras}),
            })
        }
    return facturas
}


function cargarEstadosVenta() {
    const lista = ['Recibido', 'No recibido']
    const estados = []
    for (let i = 0; i < numeroEstadoVentas; i++) {
        estados.push({
            nombre: lista[i]
        })
    }
    return estados
}

function cargarFacturasVenta(){
    const facturas = []
        for (let i = 0; i < numeroVentas; i++) {
            const fecha = faker.date.recent();
            facturas.push({
                fecha: fecha.toISOString().split('T')[0], // Formato YYYY-MM-DD (DATEONLY en Sequelize)
                hora: fecha.toTimeString().split(' ')[0], // Formato HH:MM:SS (TIME en Sequelize)   
                cliente_id: faker.number.int({min: 1, max: numeroClientes}),
                direccion: faker.location.streetAddress(),
                pagado: 0,
                total: 0,
                estado_id: faker.number.int({min: 1, max: numeroEstadoVentas})
            })
        }
    return facturas
}


function cargarDetallesCompra(){
    const detalles = []
    for (let j=0; j<numeroCompras; j++){
        const num_productos = faker.number.int({min: 1, max: numeroProductos / 5})
        const productos_id = faker.helpers.uniqueArray(()=>faker.number.int({min: 1, max: num_productos}), numeroCompras)

        for (let i = 0; i < num_productos; i++) {
            detalles.push({
                compra_id: j+1,
                producto_id: productos_id[i],
                cantidad: faker.number.int({min: 1, max: 100}),
                //precio: faker.number.int({min: 100, max: 10000}),
                precio: faker.number.int({min: 10, max: 10}),
                subtotal: faker.number.int({min: 10000, max: 50000})
            })
        }
    }
    return detalles 
}

function cargarDetallesVenta() {
    const detalles = []
    for (let j=0; j<numeroVentas; j++){
        const num_productos = faker.number.int({min: 1, max: numeroProductos / 5})
        const productos_id = faker.helpers.uniqueArray(()=>faker.number.int({min: 1, max: num_productos}), numeroVentas)
        for (let i = 0; i < num_productos; i++) {
            detalles.push({
                venta_id: j+1,
                producto_id: productos_id[i],
                cantidad: faker.number.int({min: 1, max: 100}),
                precio: faker.number.int({min: 100, max: 10000}),
                subtotal: faker.number.int({min: 10000, max: 50000})
            })
        }
    }
    
    return detalles 
}

function cargarPagos(){
    const facturas = []
    for(let i = 0; i < numeroPagos; i++){
        const fecha = faker.date.recent();
        facturas.push({
            fecha: fecha.toISOString().split('T')[0],
            hora: fecha.toTimeString().split(' ')[0], 
            cliente_id: faker.number.int({min: 1, max:numeroClientes}),
            valor: 0,
            
        }   
        )
    }
    return facturas
}

function cargarAbonos(){
    const facturas = []
    for(let i = 0; i < numeroAbonos; i++){
        const fecha = faker.date.recent();
        facturas.push({
            fecha: fecha.toISOString().split('T')[0],
            hora: fecha.toTimeString().split(' ')[0], 
            cliente_id: faker.number.int({min: 1, max: numeroClientes}),
            valor: 0,
            
        }   
        )
    }
    return facturas

}



module.exports = {
    cargarMedidas,
    cargarCategorias,
    cargarMarcas,
    cargarProductos,
    
    cargarTiposCliente,
    cargarClientes,
    
    cargarEstadosCompra,
    cargarFacturasCompra,

    cargarEstadosVenta,
    cargarFacturasVenta,

    cargarDetallesCompra,
    cargarDetallesVenta,

    cargarPagos,
    cargarAbonos,
    
    
}