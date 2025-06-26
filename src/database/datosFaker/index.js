const { faker } = require('@faker-js/faker')
const bcrypt = require('bcrypt')

const numeroMedidas = 18
const numeroProductos = 5000

const numeroTiposClientes = 3
const numeroClientes = 100

const numeroCompras = 500

const numeroVentas = 500

const numeroProductosDetalles = 10

const numeroMetodosPagos = 3

const numeroAbonos = 2000
const numeroPagos = 2000

function medidas () {
  const medidas = [
    { nombre: 'unidad', categoria: 'unidad' },
    { nombre: 'servicio', categoria: 'unidad' },
    { nombre: 'caja', categoria: 'unidad' },
    { nombre: 'centimetro', categoria: 'longitud' },
    { nombre: 'metro', categoria: 'longitud' },
    { nombre: 'pulgada', categoria: 'longitud' },
    { nombre: 'pie', categoria: 'longitud' },
    { nombre: 'decimetro', categoria: 'longitud' },
    { nombre: 'kilometro', categoria: 'longitud' },
    { nombre: 'mililitro', categoria: 'volumen' },
    { nombre: 'Litro', categoria: 'volumen' },
    { nombre: 'Galon', categoria: 'volumen' },
    { nombre: 'metro cubico', categoria: 'volumen' },
    { nombre: 'gramo', categoria: 'Peso' },
    { nombre: 'Kilogramo', categoria: 'Peso' },
    { nombre: 'Tonelada', categoria: 'Peso' },
    { nombre: 'Libra', categoria: 'Peso' },
    { nombre: 'Miligramo', categoria: 'Peso' }
  ]
  return medidas
}

function tiposCliente () {
  const tipos = [
    { nombre: 'proveedor' },
    { nombre: 'cliente' },
    { nombre: 'ambos' }

  ]
  return tipos
}

function estadosEntregaCompra () {
  const estados = [
    { nombre: 'No recibido' },
    { nombre: 'Recibido' }
  ]

  return estados
}

function estadosPagoCompra () {
  const estados = [
    { nombre: 'Por pagar' },
    { nombre: 'Pagado' }
  ]
  return estados
}

function estadosEntregaVenta () {
  const estados = [
    { nombre: 'No entregado' },
    { nombre: 'Entregado' }
  ]
  return estados
}

function estadosPagoVenta () {
  const estados = [
    { nombre: 'Por pagar' },
    { nombre: 'Pagado' }
  ]
  return estados
}

function metodosPagos () {
  const metodos = [
    { nombre: 'Efectivo' },
    { nombre: 'Transferencia bancaria' },
    { nombre: 'Consignacion' }
  ]
  return metodos
}

function tipoDocumento () {
  const tipos = [
    { nombre: 'producto' },
    { nombre: 'cliente' },
    { nombre: 'compra' },
    { nombre: 'venta' },
    { nombre: 'pago' },
    { nombre: 'abono' }
  ]
  return tipos
}

async function usuarios () {
  const contrasenia1 = '1212'
  const contrasenia2 = '4848'
  const cost = Number(process.env.BCRYPT_COST)
  const hashedContrasenia1 = await bcrypt.hash(contrasenia1, cost)
  const hashedContrasenia2 = await bcrypt.hash(contrasenia2, cost)

  const hoy = new Date()
  const fecha = hoy.toISOString().split('T')[0]
  const usuarios = [
    { nombre: 'Juan Diego', email: 'juandiego.gomez1@utp.edu.co', contrasenia: hashedContrasenia1, createdAt: fecha },
    { nombre: 'Jesus David', email: 'juanka032917@gmail.com', contrasenia: hashedContrasenia2, createdAt: fecha }
  ]

  return usuarios
}

async function empresas () {
  const hoy = new Date()
  const fecha = hoy.toISOString().split('T')[0]
  const empresas = [
    { usuario_id: 1, nombre: 'FrutyCocos', nit: 9012282266, direccion: 'Mz 7 cs 9', telefono: '3227869638', createdAt: fecha },
    { usuario_id: 2, nombre: 'Compra ven', nit: 8878697678, direccion: 'Mercasa P', telefono: '3107670360', createdAt: fecha }
  ]

  return empresas
}

async function secuencia () {
  const secuencias = [
    { usuario_id: 1, tipos_documento_id: 1, valor_actual: 0 },
    { usuario_id: 1, tipos_documento_id: 2, valor_actual: 0 },
    { usuario_id: 1, tipos_documento_id: 3, valor_actual: 0 },
    { usuario_id: 1, tipos_documento_id: 4, valor_actual: 0 },
    { usuario_id: 1, tipos_documento_id: 5, valor_actual: 0 },
    { usuario_id: 1, tipos_documento_id: 6, valor_actual: 0 },
    { usuario_id: 2, tipos_documento_id: 1, valor_actual: 0 },
    { usuario_id: 2, tipos_documento_id: 2, valor_actual: 0 },
    { usuario_id: 2, tipos_documento_id: 3, valor_actual: 0 },
    { usuario_id: 2, tipos_documento_id: 4, valor_actual: 0 },
    { usuario_id: 2, tipos_documento_id: 5, valor_actual: 0 },
    { usuario_id: 2, tipos_documento_id: 6, valor_actual: 0 }
  ]
  return secuencias
}

function categorias () {
  const nombres = ['No aplica', 'Alimentos', 'Bebidas', 'Limpieza', 'vehiculos', 'Electrodomesticos']
  const descripcion = [
    'Productos sin categoria',
    'Aqui se encuentran los alimentos, como frutas, verduras, carne, pescado, etc.',
    'Aqui se encuentran las bebidas, como agua, coca cola, sprite, etc.',
    'Aqui se encuentran los productos de limpieza, como jabones, detergente, etc.',
    'Aqui se encuentran los productos relacionados con vehiculos, como carros, motos y repuestos',
    'Aqui se encuentran los electrodomesticos, como neveras, lavadoras, etc.'
  ]
  const categorias = [
    { usuario_id: 1, categoria_id: 1, nombre: nombres[0], descripcion: descripcion[0] },
    { usuario_id: 1, categoria_id: 2, nombre: nombres[1], descripcion: descripcion[1] },
    { usuario_id: 1, categoria_id: 3, nombre: nombres[2], descripcion: descripcion[2] },
    { usuario_id: 1, categoria_id: 4, nombre: nombres[3], descripcion: descripcion[3] },
    { usuario_id: 2, categoria_id: 1, nombre: nombres[0], descripcion: descripcion[0] },
    { usuario_id: 2, categoria_id: 2, nombre: nombres[4], descripcion: descripcion[4] },
    { usuario_id: 2, categoria_id: 3, nombre: nombres[5], descripcion: descripcion[5] }
  ]
  return categorias
}

function productos () {
  const nombre1 = faker.helpers.uniqueArray(faker.commerce.productName, numeroProductos)
  const nombre2 = faker.helpers.uniqueArray(faker.commerce.productName, numeroProductos)
  const productos1 = []
  const productos2 = []
  for (let i = 0; i < numeroProductos; i++) {
    productos1.push({
      usuario_id: 1,
      producto_id: i + 1,
      nombre: nombre1[i],
      categoria_id: faker.number.int({ min: 1, max: 4 }),
      medida_id: faker.number.int({ min: 1, max: numeroMedidas }),
      precio_compra: faker.number.int({ min: 10000, max: 50000 }),
      precio_venta: faker.number.int({ min: 50000, max: 100000 }),
      cantidad: faker.number.int({ min: 1, max: 100 }),
      total: faker.number.int({ min: 100000000, max: 100000000000 })
    })

    productos2.push({
      usuario_id: 2,
      producto_id: i + 1,
      nombre: nombre2[i],
      categoria_id: faker.number.int({ min: 5, max: 7 }),
      medida_id: faker.number.int({ min: 1, max: numeroMedidas }),
      precio_compra: faker.number.int({ min: 10000, max: 50000 }),
      precio_venta: faker.number.int({ min: 50000, max: 100000 }),
      cantidad: faker.number.int({ min: 1, max: 100 }),
      total: faker.number.int({ min: 100000000, max: 100000000000 })
    })
  }
  const productos = [...productos1, ...productos2]
  return productos
}

function clientes () {
  const nombre = faker.helpers.uniqueArray(faker.person.fullName, numeroClientes)

  const clientes1 = []
  const clientes2 = []
  for (let i = 0; i < numeroClientes; i++) {
    clientes1.push({
      usuario_id: 1,
      cliente_id: i + 1,
      nombre: nombre[i],
      direccion: faker.location.streetAddress(),
      telefono: faker.helpers.arrayElement([32279638, 31000000, 3200000, 3500000]),
      email: faker.internet.email(),
      tipo_id: faker.number.int({ min: 1, max: numeroTiposClientes }),
      por_pagarle: 0,
      debe: 0
    })

    clientes2.push({
      usuario_id: 2,
      cliente_id: i + 1,
      nombre: nombre[i],
      direccion: faker.location.streetAddress(),
      telefono: faker.helpers.arrayElement([32279638, 31000000, 3200000, 3500000]),
      email: faker.internet.email(),
      tipo_id: faker.number.int({ min: 1, max: numeroTiposClientes }),
      por_pagarle: 0,
      debe: 0
    })
  }

  const clientes = [...clientes1, ...clientes2]
  return clientes
}

function facturasCompra () {
  const facturas1 = []
  const facturas2 = []
  for (let i = 0; i < numeroCompras; i++) {
    const fecha = faker.date.recent()
    const factura1 = {
      usuario_id: 1,
      compra_id: i + 1,
      fecha: fecha.toISOString().split('T')[0],
      hora: fecha.toTimeString().split(' ')[0],
      cliente_id: faker.number.int({ min: 1, max: numeroClientes }),
      pagado: 0,
      total: 0,
      estado_entrega_id: faker.number.int({ min: 1, max: 2 }),
      estado_pago_id: 1
    }

    const factura2 = {
      usuario_id: 2,
      compra_id: i + 1,
      fecha: fecha.toISOString().split('T')[0],
      hora: fecha.toTimeString().split(' ')[0],
      cliente_id: faker.number.int({ min: numeroClientes + 1, max: numeroClientes * 2 }),
      pagado: 0,
      total: 0,
      estado_entrega_id: faker.number.int({ min: 1, max: 2 }),
      estado_pago_id: 1
    }

    if (factura1.cliente_id === 1) {
      factura1.nombre_cliente = faker.person.firstName()
    }
    if (factura2.cliente_id === 1) {
      facturas2.nombre_cliente = faker.person.firstName()
    }

    facturas1.push(factura1)
    facturas2.push(factura2)
  }

  const facturas = [...facturas1, ...facturas2]
  return facturas
}

function facturasVenta () {
  const facturas1 = []
  const facturas2 = []
  for (let i = 0; i < numeroVentas; i++) {
    const fecha = faker.date.recent()
    const factura1 = {
      usuario_id: 1,
      factura_id: i + 1,
      fecha: fecha.toISOString().split('T')[0], // Formato YYYY-MM-DD (DATEONLY en Sequelize)
      hora: fecha.toTimeString().split(' ')[0], // Formato HH:MM:SS (TIME en Sequelize)
      cliente_id: faker.number.int({ min: 1, max: numeroClientes }),
      pagado: 0,
      total: 0,
      estado_entrega_id: faker.number.int({ min: 1, max: 2 }),
      estado_pago_id: 1,
      direccion: faker.location.streetAddress()
    }

    const factura2 = {
      usuario_id: 2,
      factura_id: i + 1,
      fecha: fecha.toISOString().split('T')[0], // Formato YYYY-MM-DD (DATEONLY en Sequelize)
      hora: fecha.toTimeString().split(' ')[0], // Formato HH:MM:SS (TIME en Sequelize)
      cliente_id: faker.number.int({ min: numeroClientes + 1, max: numeroClientes * 2 }),
      pagado: 0,
      total: 0,
      estado_entrega_id: faker.number.int({ min: 1, max: 2 }),
      estado_pago_id: 1,
      direccion: faker.location.streetAddress()
    }

    if (factura1.cliente_id === 1) {
      factura1.nombre_cliente = faker.person.firstName()
    }
    if (factura2.cliente_id === 1) {
      factura2.nombre_cliente = faker.person.firstName()
    }

    facturas1.push(factura1)
    facturas2.push(factura2)
  }

  const facturas = [...facturas1, ...facturas2]

  return facturas
}

function pagos () {
  const pagos1 = []
  const pagos2 = []
  for (let i = 0; i < numeroPagos; i++) {
    const fecha = faker.date.recent()

    const pago1 = {
      usuario_id: 1,
      pago_id: i + 1,
      fecha: fecha.toISOString().split('T')[0],
      hora: fecha.toTimeString().split(' ')[0],
      cliente_id: faker.number.int({ min: 1, max: numeroClientes }),
      metodo_pago_id: faker.number.int({ min: 1, max: numeroMetodosPagos }),
      valor: faker.number.int({ min: 10000, max: 500000 })
    }

    const pago2 = {
      usuario_id: 2,
      pago_id: i + 1,
      fecha: fecha.toISOString().split('T')[0],
      hora: fecha.toTimeString().split(' ')[0],
      cliente_id: faker.number.int({ min: numeroClientes, max: numeroClientes * 2 }),
      metodo_pago_id: faker.number.int({ min: 1, max: numeroMetodosPagos }),
      valor: faker.number.int({ min: 10000, max: 500000 })
    }

    if (pago1.metodo_pago_id > 1) {
      pago1.descripcion = faker.commerce.productDescription()
    } else {
      pago1.descripcion = ''
    }

    if (pago2.metodo_pago_id > 1) {
      pago2.descripcion = faker.commerce.productDescription()
    } else {
      pago2.descripcion = ''
    }

    pagos1.push(pago1)
    pagos2.push(pago2)
  }

  const pagos = [...pagos1, ...pagos2]
  return pagos
}

function abonos () {
  const abonos1 = []
  const abonos2 = []
  for (let i = 0; i < numeroAbonos; i++) {
    const fecha = faker.date.recent()
    const abono1 = {
      usuario_id: 1,
      abono_id: i + 1,
      fecha: fecha.toISOString().split('T')[0],
      hora: fecha.toTimeString().split(' ')[0],
      cliente_id: faker.number.int({ min: 1, max: numeroClientes }),
      metodo_pago_id: faker.number.int({ min: 1, max: numeroMetodosPagos }),
      valor: faker.number.int({ min: 10000, max: 500000 })
    }

    const abono2 = {
      usuario_id: 2,
      abono_id: i + 1,
      fecha: fecha.toISOString().split('T')[0],
      hora: fecha.toTimeString().split(' ')[0],
      cliente_id: faker.number.int({ min: numeroClientes + 1, max: numeroClientes * 2 }),
      metodo_pago_id: faker.number.int({ min: 1, max: numeroMetodosPagos }),
      valor: faker.number.int({ min: 10000, max: 500000 })
    }

    if (abono1.metodo_pago_id > 1) {
      abono1.descripcion = faker.commerce.productDescription()
    } else {
      abono1.descripcion = ''
    }

    if (abono2.metodo_pago_id > 1) {
      abono2.descripcion = faker.commerce.productDescription()
    } else {
      abono2.descripcion = ''
    }

    abonos1.push(abono1)
    abonos2.push(abono2)
  }
  const abonos = [...abonos1, ...abonos2]
  return abonos
}

function detallesCompra () {
  const detalles1 = []
  const detalles2 = []
  for (let j = 0; j < numeroCompras; j++) {
    const numProductos = faker.number.int({ min: 1, max: numeroProductosDetalles })
    const productosId1 = faker.helpers.uniqueArray(() => faker.number.int({ min: 1, max: numeroProductos }), numProductos)
    const productosId2 = faker.helpers.uniqueArray(() => faker.number.int({ min: numeroProductos + 1, max: numeroProductos * 2 }), numProductos)
    for (let i = 0; i < numProductos; i++) {
      detalles1.push({
        compra_id: j + 1,
        producto_id: productosId1[i],
        cantidad: faker.number.int({ min: 1, max: 100 }),
        precio: faker.number.int({ min: 100, max: 10000 }),
        subtotal: faker.number.int({ min: 10000, max: 50000 })
      })

      detalles2.push({
        compra_id: j + 1 + numeroCompras,
        producto_id: productosId2[i],
        cantidad: faker.number.int({ min: 1, max: 100 }),
        precio: faker.number.int({ min: 100, max: 10000 }),
        subtotal: faker.number.int({ min: 10000, max: 50000 })
      })
    }
  }
  const detalles = [...detalles1, ...detalles2]
  return detalles
}

function detallesVenta () {
  const detalles1 = []
  const detalles2 = []
  for (let j = 0; j < numeroVentas; j++) {
    const numProductos = faker.number.int({ min: 1, max: numeroProductosDetalles })

    const productosId1 = faker.helpers.uniqueArray(() => faker.number.int({ min: 1, max: numeroProductos }), numProductos)
    const productosId2 = faker.helpers.uniqueArray(() => faker.number.int({ min: numeroProductos + 1, max: numeroProductos * 2 }), numProductos)

    for (let i = 0; i < numProductos; i++) {
      detalles1.push({
        venta_id: j + 1,
        producto_id: productosId1[i],
        cantidad: faker.number.int({ min: 1, max: 100 }),
        precio: faker.number.int({ min: 100, max: 10000 }),
        subtotal: faker.number.int({ min: 10000, max: 50000 })
      })

      detalles2.push({
        venta_id: j + 1 + numeroVentas,
        producto_id: productosId2[i],
        cantidad: faker.number.int({ min: 1, max: 100 }),
        precio: faker.number.int({ min: 100, max: 10000 }),
        subtotal: faker.number.int({ min: 10000, max: 50000 })
      })
    }
  }
  const detalles = [...detalles1, ...detalles2]
  return detalles
}

module.exports = {
  medidas,
  tiposCliente,
  estadosEntregaCompra,
  estadosPagoCompra,
  estadosEntregaVenta,
  estadosPagoVenta,
  metodosPagos,
  tipoDocumento,
  usuarios,
  empresas,
  secuencia,
  categorias,
  productos,
  clientes,
  facturasCompra,
  facturasVenta,
  pagos,
  abonos,
  detallesCompra,
  detallesVenta

}
