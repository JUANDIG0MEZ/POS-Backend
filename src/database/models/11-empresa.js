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
    usuario_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      unique: true,
      references: {
        model: 'Usuario',
        key: 'id'
      }
    },

    nombre: {
      type: DataTypes.STRING(200)
    },
    nit: {
      type: DataTypes.STRING
    },
    direccion: {
      type: DataTypes.STRING(120)
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
