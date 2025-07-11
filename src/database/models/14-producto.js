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
      defaultValue: 0,
      get () {
        return Number(this.getDataValue('precio_compra'))
      },
      validate: {

      }
    },
    precio_venta: {
      type: DataTypes.DECIMAL(15, 3),
      allowNull: false,
      defaultValue: 0,
      get () {
        return Number(this.getDataValue('precio_venta'))
      }
    },
    cantidad: {
      type: DataTypes.DECIMAL(15, 3),
      allowNull: false,
      defaultValue: 0,
      get () {
        return Number(this.getDataValue('cantidad'))
      }
    },
    total: {
      type: DataTypes.DECIMAL(15, 3),
      allowNull: false,
      get () {
        return Number(this.getDataValue('total'))
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
          const cantidad = producto.cantidad
          const precioCompra = producto.precio_compra

          if (cantidad < 0) producto.total = 0
          else producto.total = cantidad * precioCompra
        }
      },
      beforeCreate (producto) {
        const cantidad = producto.cantidad
        const precioCompra = producto.precio_compra

        if (cantidad < 0) throw new Error('La cantidad no puede ser negativa')

        producto.total = cantidad * precioCompra
      }
    }
  })
  return Producto
}
