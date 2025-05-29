const { Model } = require('sequelize');

'use strict';

module.exports = (sequelize, DataTypes) => {
  class ProductoMarca extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductoMarca.hasMany(models.Producto, {
        foreignKey: 'marca_id',
        as: 'marcaProducto'
      })
    }
  }
  ProductoMarca.init({

    nombre: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      set(value) {
        
        this.setDataValue('nombre', value.toLowerCase().trim());
      },
      get() {
        const nombre = this.getDataValue('nombre');
        return nombre? nombre.charAt(0).toUpperCase() + nombre.slice(1): '';
      }
    }
  }, {
    sequelize,
    modelName: 'ProductoMarca',
    timestamps: false,
    tableName: 'ProductoMarca'
  });
  return ProductoMarca;
};