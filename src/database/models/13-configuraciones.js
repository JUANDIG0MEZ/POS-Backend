'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Configuracion extends Model {
    static associate (models) {
      Configuracion.belongsTo(models.Configuracion, {
        as: 'configuracionUsuario',
        foreignKey: 'id_usuario'

      })
    }
  }
  Configuracion.init({
    id_usuario: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Usuario',
        key: 'id'
      }
    },
    decimalesCantidad: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 2,
      validate: {
        max: 3
      }
    },
    decimalesPrecio: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 2,
      validate: {
        max: 3
      }
    },
    decimalesTotal: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 3,
      validate: {
        max: 3
      }
    }
  }, {
    sequelize,
    modelName: 'Configuracion',
    tableName: 'Configuracion',
    timestamps: false
  })
  return Configuracion
}
