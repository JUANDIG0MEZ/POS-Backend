'use strict'

const { Model } = require('sequelize')
const { ErrorUsuario } = require('../../errors/ErrorUsuario')

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
    cliente_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      references: {
        model: 'Usuario',
        key: 'id'
      }
    },
    descripcion: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: true
    },
    nombre: {
      type: DataTypes.STRING(200),
      unique: true,
      allowNull: false,
      set (value) {
        this.setDataValue('nombre', value.toLowerCase().trim())
      }
    }
  }, {
    sequelize,
    modelName: 'ProductoCategoria',
    timestamps: false,
    tableName: 'ProductoCategoria',

    hooks: {
      beforeCreate (categoria) {
        if (categoria.nombre === '') {
          throw new ErrorUsuario('El nombre de la categoria no puede estar vacio')
        }
      }
    }
  })
  return ProductoCategoria
}
