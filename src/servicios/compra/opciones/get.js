const { Cliente, CompraEstadoEntrega, CompraEstadoPago, Producto, ProductoMedida } = require('../../../database/models')
const { col, Op } = require('sequelize')

class OpcionesGetCompras {
  static atributos () {
    const attributes = {
      exclude: ['id', 'id_usuario', 'id_cliente', 'hora', 'cliente_id', 'id_estado_entrega', 'id_estado_pago', 'pagado'],
      include: [
        [col('estadoEntregaCompra.nombre'), 'estado_entrega'],
        [col('estadoPagoCompra.nombre'), 'estado_pago']]
    }
    return attributes
  }

  static incluir () {
    const include = [
      { model: CompraEstadoEntrega, attributes: [], as: 'estadoEntregaCompra' },
      { model: CompraEstadoPago, attributes: [], as: 'estadoPagoCompra' }]

    return include
  }

  //
  static async donde ({ idUsuario, compra_id, cliente_id, id_estado_entrega, id_estado_pago, fechaInicio, fechaFinal }) {
    const where = { id_usuario: idUsuario }

    if (compra_id) {
      where.compra_id = compra_id
      return where
    }

    if (id_estado_entrega) where.id_estado_entrega = id_estado_entrega
    if (id_estado_pago) where.id_estado_pago = id_estado_pago
    if (cliente_id) {
      const cliente = await Cliente.findOne({ where: { id_usuario: idUsuario, cliente_id } })
      where.id_cliente = cliente.id
    }
    if (fechaInicio || fechaFinal) {
      if (!fechaInicio) fechaInicio = '1900-01-01'
      if (!fechaFinal) fechaFinal = new Date().toISOString().split('T')[0]

      where.fecha = {
        [Op.between]: [fechaInicio, fechaFinal]
      }
    }

    return where
  }

  static orden ({ orden, columna }) {
    const orden2 = orden || 'ASC'
    const columna2 = columna || 'compra_id'
    return [[columna2, orden2]]
  }
}

class OpcionesGetCompra {
  static atributos () {
    const attributes = {
      exclude: ['id', 'compra_id', 'id_usuario', 'id_cilente'],
      include: [
        [col('clienteCompra.telefono'), 'telefono'],
        [col('clienteCompra.email'), 'email']
      ]

    }

    return attributes
  }

  static incluir () {
    const include = {
      model: Cliente,
      as: 'clienteCompra',
      attributes: []
    }

    return include
  }
}

class OpcionesGetDetalle {
  static atributos () {
    const attributes = {
      exclude: ['compra_id'],
      include: [
        [col('productoDetalleCompra.nombre'), 'nombre'],
        [col('productoDetalleCompra.medidaProducto.nombre'), 'medida']]
    }

    return attributes
  }

  static incluir () {
    const include = [
      {
        model: Producto,
        as: 'productoDetalleCompra',
        attributes: [],
        include: [
          { model: ProductoMedida, as: 'medidaProducto', attributes: [] }
        ]
      }

    ]
    return include
  }
}

module.exports = {
  OpcionesGetCompras,
  OpcionesGetCompra,
  OpcionesGetDetalle
}
