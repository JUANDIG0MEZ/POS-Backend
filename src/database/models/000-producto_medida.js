'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class ProductoMedida extends Model {
    static associate (models) {
      ProductoMedida.hasMany(models.Producto, {
        foreignKey: 'medida_id',
        as: 'medidaProducto'
      })
    }
  }
  ProductoMedida.init({

    nombre: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: true,
      set (value) {
        this.setDataValue('nombre', value.toLowerCase().trim())
      }
    },

    categoria: {
      type: DataTypes.STRING(200),
      allowNull: false
    }

  }, {
    sequelize,
    modelName: 'ProductoMedida',
    timestamps: false,
    tableName: 'ProductoMedida'
  })
  return ProductoMedida
}
