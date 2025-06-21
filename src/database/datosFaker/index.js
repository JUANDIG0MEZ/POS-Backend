const { faker } = require('@faker-js/faker')

const numeroMedidas = 7
const numeroCategorias = 5
const numeroMarcas = 50
const numeroProductos = 5000

const numeroTiposClientes = 3
const numeroClientes = 100

const numeroEstadoEntregaCompras = 2
const numeroEstadoPagoCompras = 2
const numeroCompras = 1000

const numeroEstadoEntregaVentas = 2
const numeroEstadoPagoVentas = 2
const numeroVentas = 1000

const numeroProductosDetalles = parseInt(numeroProductos / 200)

const numeroMetodosPagos = 3

const numeroAbonos = 2000
const numeroPagos = 2000

function cargarMedidas () {
  const lista = ['kG', 'UniDad', 'Litro', 'Metro', 'Gramo', 'Mililitro', 'Centimetro']
  const medidas = []
  for (let i = 0; i < numeroMedidas; i++) {
    medidas.push({
      nombre: lista[i]
    })
  }
  return medidas
}

function cargarCategorias () {
  const lista = ['', 'Alimentos', 'Bebidas', 'Limpieza', 'Hogar', 'Electrodomesticos']
  const descripcion = [
    'Productos sin categoria',
    'Aqui se encuentran los alimentos, como frutas, verduras, carne, pescado, etc.',
    'Aqui se encuentran las bebidas, como agua, coca cola, sprite, etc.',
    'Aqui se encuentran los productos de limpieza, como jabones, detergente, etc.',
    'Aqui se encuentran los productos de hogar, como ropa, electrodomesticos, etc.',
    'Aqui se encuentran los electrodomesticos, como neveras, lavadoras, etc.'
  ]
  const categorias = []
  for (let i = 0; i < numeroCategorias; i++) {
    categorias.push({
      nombre: lista[i],
      descripcion: descripcion[i]
    })
  }
  return categorias
}

function cargarMarcas () {
  const lista = faker.helpers.uniqueArray(faker.company.name, numeroMarcas)
  const marcas = []
  for (let i = 0; i < numeroMarcas; i++) {
    marcas.push({
      nombre: lista[i]
    })
  }
  return marcas
}

function cargarProductos () {
  const nombre = faker.helpers.uniqueArray(faker.commerce.productName, numeroProductos)
  const productos = []
  for (let i = 0; i < numeroProductos; i++) {
    productos.push({
      nombre: nombre[i],
      marca_id: faker.number.int({ min: 1, max: numeroMarcas }),
      categoria_id: faker.number.int({ min: 1, max: numeroCategorias }),
      medida_id: faker.number.int({ min: 1, max: numeroMedidas }),
      precio_compra: faker.number.int({ min: 10000, max: 50000 }),
      precio_venta: faker.number.int({ min: 50000, max: 100000 }),
      cantidad: faker.number.int({ min: 1, max: 100 }),
      total: faker.number.int({ min: 100000000, max: 100000000000 })
    })
  }
  return productos
}

function cargarTiposCliente () {
  const lista = ['Proveedor', 'Cliente', 'Ambos']
  const tipos = []
  for (let i = 0; i < numeroTiposClientes; i++) {
    tipos.push({
      nombre: lista[i]
    })
  }
  return tipos
}

function cargarClientes () {
  const nombre = faker.helpers.uniqueArray(faker.person.fullName, numeroClientes)

  const clientes = []

  for (let i = 0; i < numeroClientes; i++) {
    clientes.push({
      nombre: nombre[i],
      direccion: faker.location.streetAddress(),
      telefono: faker.helpers.arrayElement([32279638, 31000000, 3200000, 3500000]),
      email: faker.internet.email(),
      tipo_id: faker.number.int({ min: 1, max: numeroTiposClientes }),
      por_pagarle: 0,
      debe: 0
    })
  }
  return clientes
}

function cargarEstadosEntregaCompra () {
  const lista = ['No recibido', 'Recibido']
  const estados = []
  for (let i = 0; i < numeroEstadoEntregaCompras; i++) {
    estados.push({
      nombre: lista[i]
    })
  }
  return estados
}

function cargarEstadosPagoCompra () {
  const lista = ['Por pagar', 'Pagado']
  const estados = []
  for (let i = 0; i < numeroEstadoPagoCompras; i++) {
    estados.push({
      nombre: lista[i]
    })
  }
  return estados
}

function cargarFacturasCompra () {
  const facturas = []
  for (let i = 0; i < numeroCompras; i++) {
    const fecha = faker.date.recent()
    const factura = {
      fecha: fecha.toISOString().split('T')[0],
      hora: fecha.toTimeString().split(' ')[0],
      cliente_id: faker.number.int({ min: 1, max: numeroClientes }),
      pagado: 0,
      total: 0,
      estado_entrega_id: faker.number.int({ min: 1, max: numeroEstadoEntregaCompras }),
      estado_pago_id: 1
    }

    if (factura.cliente_id == 1) {
      factura.nombre_cliente = faker.person.firstName()
    }

    facturas.push(factura)
  }
  return facturas
}

function cargarEstadosEntregaVenta () {
  const lista = ['No entregado', 'entregado']
  const estados = []
  for (let i = 0; i < numeroEstadoEntregaVentas; i++) {
    estados.push({
      nombre: lista[i]
    })
  }
  return estados
}

function cargarEstadosPagoVenta () {
  const lista = ['Por pagar', 'Pagado']
  const estados = []
  for (let i = 0; i < numeroEstadoPagoVentas; i++) {
    estados.push({
      nombre: lista[i]
    })
  }
  return estados
}

function cargarFacturasVenta () {
  const facturas = []
  for (let i = 0; i < numeroVentas; i++) {
    const fecha = faker.date.recent()
    const factura = {
      fecha: fecha.toISOString().split('T')[0], // Formato YYYY-MM-DD (DATEONLY en Sequelize)
      hora: fecha.toTimeString().split(' ')[0], // Formato HH:MM:SS (TIME en Sequelize)
      cliente_id: faker.number.int({ min: 1, max: numeroClientes }),
      direccion: faker.location.streetAddress(),
      pagado: 0,
      total: 0,
      estado_entrega_id: faker.number.int({ min: 1, max: numeroEstadoEntregaVentas }),
      estado_pago_id: 1
    }

    if (factura.cliente_id == 1) {
      factura.nombre_cliente = faker.person.firstName()
    }

    facturas.push(factura)
  }
  return facturas
}

function cargarDetallesCompra () {
  const detalles = []
  for (let j = 0; j < numeroCompras; j++) {
    const num_productos = faker.number.int({ min: 1, max: numeroProductosDetalles })
    const productos_id = faker.helpers.uniqueArray(() => faker.number.int({ min: 1, max: numeroProductos }), num_productos)
    for (let i = 0; i < num_productos; i++) {
      detalles.push({
        compra_id: j + 1,
        producto_id: productos_id[i],
        cantidad: faker.number.int({ min: 1, max: 100 }),
        precio: faker.number.int({ min: 100, max: 10000 }),
        subtotal: faker.number.int({ min: 10000, max: 50000 })
      })
    }
  }
  return detalles
}

function cargarDetallesVenta () {
  const detalles = []
  for (let j = 0; j < numeroVentas; j++) {
    const num_productos = faker.number.int({ min: 1, max: numeroProductosDetalles })
    const productos_id = faker.helpers.uniqueArray(() => faker.number.int({ min: 1, max: numeroProductos }), num_productos)
    for (let i = 0; i < num_productos; i++) {
      detalles.push({
        venta_id: j + 1,
        producto_id: productos_id[i],
        cantidad: faker.number.int({ min: 1, max: 100 }),
        precio: faker.number.int({ min: 100, max: 10000 }),
        subtotal: faker.number.int({ min: 10000, max: 50000 })
      })
    }
  }

  return detalles
}

function cargarMetodosPagos () {
  const lista = ['Efectivo', 'Transferencia bancaria', 'consignacion']
  const metodos = []
  for (let i = 0; i < numeroMetodosPagos; i++) {
    metodos.push({
      nombre: lista[i]
    })
  }
  return metodos
}

function cargarMetodosPagosVentas () {
  const lista = ['Efectivo', 'Transferencia bancaria']
  const metodos = []
  for (let i = 0; i < numeroMetodosPagos; i++) {
    metodos.push({
      nombre: lista[i]
    })
  }
  return metodos
}

function cargarMetodosPagosCompras () {
  const lista = ['Efectivo', 'Transferencia bancaria', 'consignacion']
  const metodos = []
  for (let i = 0; i < numeroMetodosPagos; i++) {
    metodos.push({
      nombre: lista[i]
    })
  }
  return metodos
}

function cargarPagos () {
  const facturas = []
  for (let i = 0; i < numeroPagos; i++) {
    const fecha = faker.date.recent()

    const factura = {
      fecha: fecha.toISOString().split('T')[0],
      hora: fecha.toTimeString().split(' ')[0],
      cliente_id: faker.number.int({ min: 1, max: numeroClientes }),
      metodo_pago_id: faker.number.int({ min: 1, max: numeroMetodosPagos }),
      valor: faker.number.int({ min: 10000, max: 500000 })
    }

    if (factura.metodo_pago_id > 1) {
      factura.descripcion = faker.commerce.productDescription()
    } else {
      factura.descripcion = ''
    }
    facturas.push(factura)
  }
  return facturas
}

function cargarAbonos () {
  const facturas = []
  for (let i = 0; i < numeroAbonos; i++) {
    const fecha = faker.date.recent()
    const factura = {
      fecha: fecha.toISOString().split('T')[0],
      hora: fecha.toTimeString().split(' ')[0],
      cliente_id: faker.number.int({ min: 1, max: numeroClientes }),
      metodo_pago_id: faker.number.int({ min: 1, max: numeroMetodosPagos }),
      valor: faker.number.int({ min: 10000, max: 500000 })
    }

    if (factura.metodo_pago_id > 1) {
      factura.descripcion = faker.commerce.productDescription()
    } else {
      factura.descripcion = ''
    }

    facturas.push(factura)
  }
  return facturas
}

function cargarMotivoNota () {
  // Nota credito es a favor del comprador
  const motivos = [
    'Error de facturacion',
    'Devolucion de productos',
    'Promocion o cupon',
    'Intereses por pago tardio',
    'Costos de flete (envio)',
    'Empaque o embalaje especial',
    'Ajuste por deterioro o merma',
    'Descuento por pronto pago'
  ]
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
  cargarMetodosPagosCompras,

  cargarEstadosEntregaVenta,
  cargarEstadosPagoVenta,
  cargarFacturasVenta,
  cargarMetodosPagosVentas,

  cargarDetallesCompra,
  cargarDetallesVenta,

  cargarMetodosPagos,

  cargarPagos,
  cargarAbonos

}
