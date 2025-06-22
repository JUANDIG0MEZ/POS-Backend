'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Empresa extends Model {
    static associate (models) {
      Empresa.hasMany(models.Producto, {
        foreignKey: 'medida_id',
        as: 'medidaProducto'
      })

      Empresa.belongsTo(models.Usuario, {
        foreignKey: 'usuario_id',
        as: 'usuarioEmpresa'
      })
    }
  }
  Empresa.init({

    nombre: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    cliente_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      references: {
        model: 'Usuario',
        key: 'id'
      }
    }

  }, {
    sequelize,
    modelName: 'Empresa',
    timestamps: false,
    tableName: 'Empresa'
  })
  return Empresa
}
