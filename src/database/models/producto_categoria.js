'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductoCategoria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductoCategoria.hasMany(models.Producto, {
        foreignKey: 'categoria_id'
      })
    }
  }
  ProductoCategoria.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nombre: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'ProductoCategoria',
    timestamps: false,
    tableName: 'productos_categorias'
  });
  return ProductoCategoria;
};