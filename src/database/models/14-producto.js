'use strict'

const { Model } = require('sequelize')
const { ErrorUsuario } = require('../../errors/usuario.js')
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    static associate (models) {
      Producto.belongsTo(models.ProductoCategoria, {
        foreignKey: 'id_categoria',
        as: 'categoriaProducto'
      })

      Producto.belongsTo(models.ProductoMedida, {
        foreignKey: 'id_medida',
        as: 'medidaProducto'
      })

      Producto.hasMany(models.DetalleCompra, {
        foreignKey: 'id_producto',
        as: 'productoDetalleCompra'
      })

      Producto.hasMany(models.DetalleVenta, {
        foreignKey: 'id_producto',
        as: 'productoDetalleVenta'
      })

      Producto.belongsTo(models.Usuario, {
        foreignKey: 'id_usuario',
        as: 'usuarioProducto'
      })
    }
  }
  Producto.init({
    id_usuario: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Usuario',
        key: 'id'
      }
    },
    producto_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false
    },

    id_categoria: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'ProductoCategoria',
        key: 'id'
      }
    },
    id_medida: {
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
      defaultValue: 0
    },
    precio_venta: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
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
