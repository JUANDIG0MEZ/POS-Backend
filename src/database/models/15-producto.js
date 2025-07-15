'use strict'

const { Model } = require('sequelize')
const { multiplicarYRedondear } = require('../../utils/decimales')
const { esNumeroSeguro } = require('../../utils/decimales.js')
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

      Producto.hasMany(models.DetalleAjuste, {
        foreignKey: 'id_producto',
        as: 'ajusteProducto'
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
      type: DataTypes.DECIMAL(15, 3),
      allowNull: false,
      defaultValue: 0
    },
    precio_venta: {
      type: DataTypes.DECIMAL(15, 3),
      allowNull: false,
      defaultValue: 0
    },
    cantidad: {
      type: DataTypes.DECIMAL(15, 3),
      allowNull: false,
      defaultValue: 0,
      validate: {
        esNumeroSeguro
      }
    },
    total: {
      type: DataTypes.DECIMAL(15, 3),
      allowNull: false,
      validate: {
        esNumeroSeguro
      }
    }
  }, {
    sequelize,
    modelName: 'Producto',
    timestamps: false,
    tableName: 'Producto',
    hooks: {
      beforeUpdate: (producto) => {
        if (producto.changed('cantidad') || producto.changed('precio_compra')) {
          if (producto.cantidad < 0) producto.total = 0
          else producto.total = multiplicarYRedondear(producto.cantidad, producto.precio_compra)
        }
      },
      beforeCreate (producto) {
        if (producto.cantidad < 0) throw new Error('La cantidad no puede ser negativa')
        producto.total = multiplicarYRedondear(producto.cantidad, producto.precio_compra)
      }
    }
  })
  return Producto
}
