'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    static associate (models) {
      Producto.belongsTo(models.ProductoCategoria, {
        foreignKey: 'categoria_id',
        as: 'categoriaProducto'
      })

      Producto.belongsTo(models.ProductoMarca, {
        foreignKey: 'marca_id',
        as: 'marcaProducto'
      })
      Producto.belongsTo(models.ProductoMedida, {
        foreignKey: 'medida_id',
        as: 'medidaProducto'
      })

      Producto.hasMany(models.DetalleCompra, {
        foreignKey: 'producto_id',
        as: 'productoDetalleCompra'
      })

      Producto.hasMany(models.DetalleVenta, {
        foreignKey: 'producto_id',
        as: 'productoDetalleVenta'
      })
    }
  }
  Producto.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      set (value) {
        this.setDataValue('nombre', value.toLowerCase().trim())
      },
      get () {
        const nombre = this.getDataValue('nombre')
        return nombre ? nombre.replace(/\b\w/g, (char) => char.toUpperCase()) : ''
      }
    },
    marca_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ProductoMarca',
        key: 'id'
      }
    },
    categoria_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ProductoCategoria',
        key: 'id'
      }
    },
    medida_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ProductoMedida',
        key: 'id'
      }
    },
    precio_compra: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    precio_venta: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isInt: true
      }
    },
    total: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Producto',
    timestamps: false,
    tableName: 'Producto',
    hooks: {
      beforeUpdate: (producto) => {
        if (producto.changed('cantidad') || producto.changed('precio_compra')) {
          const cantidad = Number(producto.cantidad)
          const precio_compra = Number(producto.precio_compra)

          if (cantidad < 0) {
            producto.total = 0
          } else {
            producto.total = cantidad * precio_compra
          }
        }
      },
      beforeCreate (producto) {
        const cantidad = Number(producto.cantidad)
        const precio_compra = Number(producto.precio_compra)

        if (cantidad < 0) {
          throw new Error('La cantidad no puede ser negativa')
        }

        producto.total = cantidad * precio_compra
      }
    }
  })
  return Producto
}
