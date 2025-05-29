const {faker, es} = require('@faker-js/faker')


const numeroMedidas = 7
const numeroCategorias = 5
const numeroMarcas = 50
const numeroProductos = 5000

const numeroTiposClientes = 3
const numeroClientes = 100



const numeroEstadoEntregaCompras = 2
const numeroEstadoPagoCompras = 2
const numeroCompras = 1000

const numeroEstadoEntregaVentas =2
const numeroEstadoPagoVentas = 2
const numeroVentas = 1000

const numeroProductosDetalles= parseInt(numeroProductos/200)


const numeroAbonos = 2000
const numeroPagos = 2000

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
            marca_id: faker.parseInt.int({min: 1, max: numeroMarcas}),
            categoria_id: faker.parseInt.int({min: 1, max: numeroCategorias}),
            medida_id: faker.parseInt.int({min: 1, max: numeroMedidas}),
            precio_compra: faker.parseInt.int({min: 10000, max: 50000}),
            precio_venta: faker.parseInt.int({min: 50000, max: 100000}),
            cantidad: faker.parseInt.int({min: 1, max: 100}),
            total: faker.parseInt.int({min: 100000000, max: 100000000000})
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
            tipo_id: faker.parseInt.int({min: 1, max: numeroTiposClientes}),
            por_pagarle: 0,
            debe: 0         
        })
    }
    return clientes
}

function cargarEstadosEntregaCompra() {
    const lista = ['Recibido', 'No recibido']
    const estados = []
    for (let i = 0; i < numeroEstadoEntregaCompras; i++) {
        estados.push({
            nombre: lista[i]
        })
    }
    return estados
}

function cargarEstadosPagoCompra() {
    const lista = ['Pagado', 'Por pagar']
    const estados = []
    for (let i = 0; i < numeroEstadoPagoCompras; i++) {
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
                cliente_id: faker.parseInt.int({min: 1, max: numeroClientes}),
                pagado: 0,
                total: 0,
                estado_entrega_id: faker.parseInt.int({min: 1, max: numeroEstadoEntregaCompras}),
                estado_pago_id: faker.parseInt.int({min: 1, max: numeroEstadoPagoCompras}),
            })
        }
    return facturas
}


function cargarEstadosEntregaVenta() {
    const lista = ['Recibido', 'No recibido']
    const estados = []
    for (let i = 0; i < numeroEstadoEntregaVentas; i++) {
        estados.push({
            nombre: lista[i]
        })
    }
    return estados
}

function cargarEstadosPagoVenta() {
    const lista = ['Pagado', 'Por pagar']
    const estados = []
    for (let i = 0; i < numeroEstadoPagoVentas; i++) {
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
                cliente_id: faker.parseInt.int({min: 1, max: numeroClientes}),
                direccion: faker.location.streetAddress(),
                pagado: 0,
                total: 0,
                estado_entrega_id: faker.parseInt.int({min: 1, max: numeroEstadoEntregaVentas}),
                estado_pago_id: faker.parseInt.int({min: 1, max: numeroEstadoPagoVentas}),
            })
        }
    return facturas
}


function cargarDetallesCompra(){
    const detalles = []
    for (let j=0; j<numeroCompras; j++){
        const num_productos = faker.parseInt.int({min: 1, max: numeroProductosDetalles})
        const productos_id = faker.helpers.uniqueArray(()=>faker.parseInt.int({min: 1, max: numeroProductos}), num_productos)
        for (let i = 0; i < num_productos; i++) {
            detalles.push({
                compra_id: j+1,
                producto_id: productos_id[i],
                cantidad: faker.parseInt.int({min: 1, max: 100}),
                precio: faker.parseInt.int({min: 100, max: 10000}),
                subtotal: faker.parseInt.int({min: 10000, max: 50000})
            })
        }
    }
    return detalles 
}

function cargarDetallesVenta() {
    const detalles = []
    for (let j=0; j<numeroVentas; j++){
        const num_productos = faker.parseInt.int({min: 1, max: numeroProductosDetalles})
        const productos_id = faker.helpers.uniqueArray(()=>faker.parseInt.int({min: 1, max: numeroProductos}), num_productos)
        for (let i = 0; i < num_productos; i++) {
            detalles.push({
                venta_id: j+1,
                producto_id: productos_id[i],
                cantidad: faker.parseInt.int({min: 1, max: 100}),
                precio: faker.parseInt.int({min: 100, max: 10000}),
                subtotal: faker.parseInt.int({min: 10000, max: 50000})
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
            cliente_id: faker.parseInt.int({min: 1, max:numeroClientes}),
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
            cliente_id: faker.parseInt.int({min: 1, max: numeroClientes}),
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
    
    cargarEstadosEntregaCompra,
    cargarEstadosPagoCompra,
    cargarFacturasCompra,

    cargarEstadosEntregaVenta,
    cargarEstadosPagoVenta,
    cargarFacturasVenta,

    cargarDetallesCompra,
    cargarDetallesVenta,

    cargarPagos,
    cargarAbonos,
    
    
}