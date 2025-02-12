'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(350),
      allowNull: false,
    },
    marca: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    categoria: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    medida: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    precioCompra: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    precioVenta: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    total: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        min: 0,
      },
    }
  }, {
    sequelize,
    modelName: 'Product',
    timestamps: true,
  });
  return Product;
};