'use strict'

const { Model } = require('sequelize')

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
    }
  }
  ProductoCategoria.init({
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
      },
      get () {
        const nombre = this.getDataValue('nombre')
        return nombre ? nombre.charAt(0).toUpperCase() + nombre.slice(1) : ''
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
          throw new Error('El nombre de la categoria no puede estar vacio')
        }
      }
    }
  })
  return ProductoCategoria
}
