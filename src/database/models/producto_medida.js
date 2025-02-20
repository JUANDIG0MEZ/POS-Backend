'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductoMedida extends Model {

    static associate(models) {
      ProductoMedida.hasMany(models.Producto, {
        foreignKey: 'medida_id'
      })
    }
  }
  ProductoMedida.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProductoMedida',
    timestamps: false,
    tableName: 'productos_medidas'
  });
  return ProductoMedida;
};