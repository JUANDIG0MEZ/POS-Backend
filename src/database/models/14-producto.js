'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    static associate (models) {
      Producto.belongsTo(models.ProductoCategoria, {
        foreignKey: 'categoria_id',
        as: 'categoriaProducto'
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

      Producto.belongsTo(models.Usuario, {
        foreignKey: 'usuario_id',
        as: 'usuarioProducto'
      })
    }
  }
  Producto.init({
    usuario_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Usuario',
        key: 'id'
      }
    },
    nombre: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    categoria_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: 'ProductoCategoria',
        key: 'id'
      }
    },
    medida_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'ProductoMedida',
        key: 'id'
      }
    },
    precio_compra: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    precio_venta: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    cantidad: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isInt: true
      }
    },
    total: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
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
          const precioCompra = Number(producto.precio_compra)

          if (cantidad < 0) {
            producto.total = 0
          } else {
            const total = cantidad * precioCompra

            producto.total = total
          }
        }
      },
      beforeCreate (producto) {
        const cantidad = Number(producto.cantidad)
        const precioCompra = Number(producto.precio_compra)

        if (cantidad < 0) {
          throw new Error('La cantidad no puede ser negativa')
        }

        producto.total = cantidad * precioCompra
      }
    }
  })
  return Producto
}
