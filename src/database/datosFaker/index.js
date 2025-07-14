// const { faker } = require('@faker-js/faker')
// const bcrypt = require('bcrypt')

// const numeroMedidas = 18
// const numeroProductos = 5000

// const numeroTiposClientes = 3
// const numeroClientes = 100

// const numeroCompras = 500

// const numeroVentas = 500

// const numeroProductosDetalles = 10

// const numeroMetodosPagos = 3

// const numeroAbonos = 2000
// const numeroPagos = 2000

function medidas () {
  const medidas = [
    { nombre: 'unidad', categoria: 'unidad' },
    { nombre: 'servicio', categoria: 'unidad' },
    { nombre: 'caja', categoria: 'unidad' },
    { nombre: 'centimetro', categoria: 'longitud' },
    { nombre: 'metro', categoria: 'longitud' },
    { nombre: 'mililitro', categoria: 'volumen' },
    { nombre: 'Litro', categoria: 'volumen' },
    { nombre: 'Galon', categoria: 'volumen' },
    { nombre: 'metro cubico', categoria: 'volumen' },
    { nombre: 'gramo', categoria: 'Peso' },
    { nombre: 'Kilogramo', categoria: 'Peso' }
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

function estadosFacturas () {
  const estados = [
    { nombre: 'cerrada' },
    { nombre: 'anulada' }
  ]

  return estados
}

module.exports = {
  medidas,
  tiposCliente,
  estadosEntregaCompra,
  estadosPagoCompra,
  estadosEntregaVenta,
  estadosPagoVenta,
  metodosPagos,
  estadosFacturas
}
