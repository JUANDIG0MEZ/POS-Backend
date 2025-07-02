const {
  ClienteTipo
} = require('../../../database/models')

const { col } = require('sequelize')
class OpcionesGet {
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

module.exports = {
  OpcionesGet
}
