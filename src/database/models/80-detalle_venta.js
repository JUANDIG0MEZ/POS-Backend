'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class DetalleVenta extends Model {
    static associate (models) {
      DetalleVenta.belongsTo(models.Venta, {
        foreignKey: 'id_venta',
        as: 'ventaDetalle'
      })

      DetalleVenta.belongsTo(models.Producto, {
        foreignKey: 'id_producto',
        as: 'productoDetalleVenta'
      })
    }
  }
  DetalleVenta.init({

    id_venta: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Venta',
        key: 'id'
      }
    },

    id_producto: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Producto',
        key: 'id'
      }
    },
    cantidad: {
      type: DataTypes.DECIMAL(15, 3),
      allowNull: false,
      validate: {
        min: 0
      },
      get () {
        return Number(this.getDataValue('cantidad'))
      }
    },
    precio: {
      type: DataTypes.DECIMAL(15, 3),
      allowNull: false,
      validate: {
        min: 0
      },
      get () {
        return Number(this.getDataValue('precio'))
      }
    },
    subtotal: {
      type: DataTypes.DECIMAL(15, 3),
      allowNull: false,
      validate: {
        min: 0
      },
      get () {
        return Number(this.getDataValue('subtotal'))
      }
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'DetalleVenta',
    tableName: 'DetalleVenta',
    hooks: {

      beforeCreate: async (detalle, options) => {
        // Crear una instancia de Producto y Compra
        const Producto = detalle.sequelize.models.Producto
        const producto = await Producto.findByPk(detalle.id_producto, {
          transaction: options.transaction,
          lock: options.transaction.LOCK.UPDATE
        })

        const Venta = detalle.sequelize.models.Venta
        const venta = await Venta.findByPk(detalle.id_venta, {
          transaction: options.transaction,
          lock: options.transaction.LOCK.UPDATE
        })

        const cantidadDetalle = detalle.cantidad
        const cantidadProducto = producto.cantidad
        const precio = detalle.precio

        producto.cantidad = cantidadProducto - cantidadDetalle
        await producto.save({ transaction: options.transaction })

        detalle.subtotal = cantidadDetalle * precio
        venta.total = venta.total + detalle.subtotal

        await venta.save({ transaction: options.transaction })
      }
    }
  })
  return DetalleVenta
}
