'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class ProductoImagen extends Model {
    static associate (models) {
      ProductoImagen.belongsTo(models.Usuario, {
        foreignKey: 'id_usuario',
        as: 'usuarioProductoImagen'
      })
    }
  }
  ProductoImagen.init({
    id_usuario: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Usuario',
        key: 'id'
      }
    },
    id_producto: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Producto',
        key: 'id'
      }
    },
    url_imagen: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'ProductoImagen',
    tableName: 'ProductoImagen',
    timestamps: false
  })
  return ProductoImagen
}
