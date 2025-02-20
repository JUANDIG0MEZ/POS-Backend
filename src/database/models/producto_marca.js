'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductoMarca extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductoMarca.hasMany(models.Producto, {
        foreignKey: 'marca_id'
      })
    }
  }
  ProductoMarca.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nombre: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'ProductoMarca',
    timestamps: false,
    tableName: 'productos_marcas'
  });
  return ProductoMarca;
};