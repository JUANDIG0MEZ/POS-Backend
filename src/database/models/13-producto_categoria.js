'use strict'

const { Model } = require('sequelize')
const { ErrorUsuario } = require('../../errors/usuario')

module.exports = (sequelize, DataTypes) => {
  class ProductoCategoria extends Model {
    static associate (models) {
      ProductoCategoria.hasMany(models.Producto, {
        foreignKey: 'id_categoria',
        as: 'categoriaProducto'
      })

      ProductoCategoria.belongsTo(models.Usuario, {
        foreignKey: 'id_usuario',
        as: 'usuarioProductoCategoria'
      })
    }
  }
  ProductoCategoria.init({
    categoria_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false
    },
    id_usuario: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Usuario',
        key: 'id'
      }
    },
    descripcion: {
      type: DataTypes.STRING(400),
      allowNull: true
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'ProductoCategoria',
    timestamps: false,
    tableName: 'ProductoCategoria',

    hooks: {
      beforeCreate (categoria) {
        if (!categoria.nombre) throw new ErrorUsuario('Escribe el nombre de la categoria.')
      }
    }
  })
  return ProductoCategoria
}
