const {
  ClienteTipo
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

module.exports = {
  ClaseClientes,
  ClaseCliente
}
