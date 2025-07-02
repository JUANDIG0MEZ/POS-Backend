'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Empresa extends Model {
    static associate (models) {
      Empresa.hasMany(models.Producto, {
        foreignKey: 'id_medida',
        as: 'medidaProducto'
      })

      Empresa.belongsTo(models.Usuario, {
        foreignKey: 'id_usuario',
        as: 'usuarioEmpresa'
      })
    }
  }
  Empresa.init({
    id_usuario: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
      unique: true,
      references: {
        model: 'Usuario',
        key: 'id'
      }
    },

    nombre: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    nit: {
      type: DataTypes.STRING(9),
      allowNull: true
    },
    direccion: {
      type: DataTypes.STRING(120),
      allowNull: true
    },
    telefono: {
      type: DataTypes.STRING(20),
      allowNull: true
    }

  }, {
    sequelize,
    modelName: 'Empresa',
    timestamps: false,
    tableName: 'Empresa'
  })
  return Empresa
}
