const {
  ClienteTipo,
  CompraEstadoEntrega,
  CompraEstadoPago,
  VentaEstadoEntrega,
  VentaEstadoPago,
  MetodoPago
} = require('../../../database/models')

const { col } = require('sequelize')

class OpcionesGetCliente {
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

class OpcionesGetClientes {
  static atributos () {
    const attributes = {
      exclude: ['id_tipo', 'telefono', 'id', 'email', 'id_usuario', 'direccion'],
      include: [[col('tipoCliente.nombre'), 'tipo']]
    }

    return attributes
  }

  static incluir () {
    return [
      { model: ClienteTipo, attributes: [], as: 'tipoCliente' }
    ]
  }

  static donde ({ idUsuario, cliente_id, id_tipo }) {
    const where = { id_usuario: idUsuario }

    if (cliente_id) {
      where.cliente_id = cliente_id
      return where
    }

    if (id_tipo) where.id_tipo = id_tipo

    return where
  }

  static orden ({ orden, columna }) {
    const order = orden || 'ASC'
    const column = columna || 'id'
    console.log(orden, columna, order, column)
    return [[column, order]]
  }
}

class OpcionesGetClienteCompra {
  static atributos () {
    return {
      exclude: ['id', 'id_usuario', 'id_cliente', 'pagado', 'id_estado_entrega', 'id_estado_pago', 'nombre_cliente'],
      include: [
        [col('estadoEntregaCompra.nombre'), 'estado_entrega'],
        [col('estadoPagoCompra.nombre'), 'estado_pago']

      ]
    }
  }

  static incluir () {
    return [
      { model: CompraEstadoEntrega, attributes: [], as: 'estadoEntregaCompra' },
      { model: CompraEstadoPago, attributes: [], as: 'estadoPagoCompra' }
    ]
  }
}

class OpcionesGetClienteVenta {
  static atributos () {
    return {
      exclude: ['id', 'id_usuario', 'id_cliente', 'pagado', 'id_estado_entrega', 'id_estado_pago', 'nombre_cliente'],
      include: [
        [col('estadoEntregaVenta.nombre'), 'estado_entrega'],
        [col('estadoPagoVenta.nombre'), 'estado_pago']

      ]
    }
  }

  static incluir () {
    return [
      { model: VentaEstadoEntrega, attributes: [], as: 'estadoEntregaVenta' },
      { model: VentaEstadoPago, attributes: [], as: 'estadoPagoVenta' }
    ]
  }
}

class OpcionesGetClienteAbono {
  static atributos () {
    return {
      exclude: ['id', 'id_usuario', 'id_cliente', 'id_metodo_pago'],
      include: [
        [col('abonoMetodoPago.nombre'), 'metodo_pago']

      ]
    }
  }

  static incluir () {
    return [
      { model: MetodoPago, attributes: [], as: 'abonoMetodoPago' }
    ]
  }
}

class OpcionesGetClientePago {
  static atributos () {
    return {
      exclude: ['id', 'id_usuario', 'id_cliente', 'id_metodo_pago'],
      include: [
        [col('pagoMetodoPago.nombre'), 'metodo_pago']

      ]
    }
  }

  static incluir () {
    return [
      { model: MetodoPago, attributes: [], as: 'pagoMetodoPago' }
    ]
  }
}

module.exports = {
  OpcionesGetCliente,
  OpcionesGetClientes,
  OpcionesGetClienteCompra,
  OpcionesGetClienteVenta,
  OpcionesGetClienteAbono,
  OpcionesGetClientePago
}
