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
      allowNull: false,
      unique: true
    },
    cliente_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      unique: true,
      references: {
        model: 'Usuario',
        key: 'id'
      }
    },
    nit: {
      type: DataTypes.STRING
    },
    direccion: {
      type: DataTypes.STRING
    },
    telefono: {
      type: DataTypes.STRING(20)
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATEONLY
    }

  }, {
    sequelize,
    modelName: 'Empresa',
    timestamps: false,
    tableName: 'Empresa'
  })
  return Empresa
}
