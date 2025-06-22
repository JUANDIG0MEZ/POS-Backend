'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class ProductoImagen extends Model {
    static associate (models) {
      ProductoImagen.belongsTo(models.Usuario, {
        foreignKey: 'usuario_id',
        as: 'usuarioProductoImagen'
      })
    }
  }
  ProductoImagen.init({
    cliente_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      references: {
        model: 'Usuario',
        key: 'id'
      }
    },
    producto_id: {
      type: DataTypes.INTEGER,
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
