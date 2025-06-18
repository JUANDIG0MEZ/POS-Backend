const {
  ClienteTipo,
  MetodoPago,
  VentaEstadoPago,
  CompraEstadoPago

} = require('../../database/models')

const { col } = require('sequelize')
class ClaseClientes {
  static atributos () {
    const attributes = {
      exclude: ['tipo_id', 'telefono'],
      include: [[col('tipoCliente.nombre'), 'Tipo']]
    }

    return attributes
  }

  static incluir () {
    return [
      { model: ClienteTipo, attributes: [], as: 'tipoCliente' }
    ]
  }

  static donde (query) {
    const where = {}

    if (Number(query.id)) {
      where.id = query.id
      return where
    }

    if (Number(query.tipo_id)) {
      where.tipo_id = query.tipo_id
    }

    return where
  }

  static orden (query) {
    const orden = query.orden ? query.orden : 'ASC'
    const columna = query.columna ? query.columna : 'id'

    return [[columna, orden]]
  }
}

class ClaseCliente {
  static atributos () {
    const attributes = {
      exclude: ['tipo_id'],
      include: [[col('tipoCliente.nombre'), 'tipo']]
    }
    return attributes
  }

  static incluir () {
    return [
      { model: ClienteTipo, attributes: [], as: 'tipoCliente' }
    ]
  }
}

// Opciones al optener los abonos
class OpcionesAbonos {
  static atributos () {
    return {
      exclude: ['metodo_pago_id', 'cliente_id'],
      include: [[col('abonoMetodoPago.nombre'), 'metodo_pago']]
    }
  }

  static incluir () {
    return [
      { model: MetodoPago, attributes: [], as: 'abonoMetodoPago' }
    ]
  }
}

class OpcionesPagos {
  static donde (clienteId) {
    return {
      cliente_id: clienteId
    }
  }

  static atributos () {
    return {
      exclude: ['metodo_pago_id', 'cliente_id'],
      include: [[col('pagoMetodoPago.nombre'), 'metodo_pago']]
    }
  }

  static incluir () {
    return [
      { model: MetodoPago, attributes: [], as: 'pagoMetodoPago' }
    ]
  }
}

class OpcionesVentas {
  static donde (clienteId) {
    return {
      cliente_id: clienteId
    }
  }

  static atributos () {
    return {
      exclude: ['cliente_id', 'nombre_cliente', 'pagado', 'estado_pago_id', 'estado_entrega_id'],
      include: [
        [col('estadoPagoVenta.nombre'), 'Estado pago']
      ]
    }
  }

  static incluir () {
    return [
      { model: VentaEstadoPago, attributes: [], as: 'estadoPagoVenta' }
    ]
  }

  static orden () {
    return [['id', 'DESC']]
  }
}

class OpcionesCompras {
  static atributos () {
    return {
      exclude: ['cliente_id', 'nombre_cliente', 'pagado'],
      include: [
        [col('estadoPagoCompra.nombre'), 'Estado pago']
      ]
    }
  }

  static donde (clienteId) {
    return {
      cliente_id: clienteId
    }
  }

  static incluir () {
    return [
      { model: CompraEstadoPago, attributes: [], as: 'estadoPagoCompra' }
    ]
  }

  static orden () {
    return [['id', 'DESC']]
  }
}
module.exports = {
  ClaseClientes,
  ClaseCliente,
  OpcionesAbonos,
  OpcionesPagos,
  OpcionesVentas,
  OpcionesCompras
}
