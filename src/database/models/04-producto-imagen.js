'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductoImagen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  ProductoImagen.init({
    producto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'productos',
        key: 'id'
      }
    },
    imagen: {
      type: DataTypes.BLOB('medium'),
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'ProductoImagen',
    tableName: 'productos_imagenes',
    timestamps: false,
  });
  return ProductoImagen;
};