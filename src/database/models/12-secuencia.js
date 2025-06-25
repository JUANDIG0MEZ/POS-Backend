'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Secuencia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  Secuencia.init({
    usuario_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      reference: {
        model: 'Usuario',
        key: 'id'
      }

    },
    tipo_documento_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      references: {
        model: 'TipoDocumento',
        key: 'id'
      }
    },
    valor_actual: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Secuencia'
  })
  return Secuencia
}
