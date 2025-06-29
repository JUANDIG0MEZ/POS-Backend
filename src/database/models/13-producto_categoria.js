'use strict'

const { Model } = require('sequelize')
const { ErrorUsuario } = require('../../errors/usuario')

module.exports = (sequelize, DataTypes) => {
  class ProductoCategoria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      ProductoCategoria.hasMany(models.Producto, {
        foreignKey: 'categoria_id',
        as: 'categoriaProducto'
      })

      ProductoCategoria.belongsTo(models.Usuario, {
        foreignKey: 'usuario_id',
        as: 'usuarioProductoCategoria'
      })
    }
  }
  ProductoCategoria.init({
    categoria_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false
    },
    usuario_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Usuario',
        key: 'id'
      }
    },
    descripcion: {
      type: DataTypes.STRING(400),
      allowNull: false
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
        if (categoria.nombre === '') {
          throw new ErrorUsuario('Escribe el nombre de la categoria.')
        }
      }
    }
  })
  return ProductoCategoria
}
