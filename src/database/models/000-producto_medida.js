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
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    categoria: {
      type: DataTypes.STRING(50),
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
