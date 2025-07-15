'use strict'

const { Model } = require('sequelize')
const { multiplicarYRedondear, esNumeroSeguro } = require('../../utils/decimales')

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
        esNumeroSeguro,
        min: 0
      }
    },
    precio: {
      type: DataTypes.DECIMAL(15, 3),
      allowNull: false,
      validate: {
        esNumeroSeguro,
        min: 0
      }
    },
    subtotal: {
      type: DataTypes.DECIMAL(15, 3),
      allowNull: false,
      validate: {
        esNumeroSeguro,
        min: 0
      }
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'DetalleVenta',
    tableName: 'DetalleVenta',
    hooks: {

      beforeCreate: async (detalle, options) => {
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

        await producto.increment('cantidad', { by: -detalle.cantidad, transaction: options.transaction })

        detalle.subtotal = multiplicarYRedondear(detalle.cantidad, detalle.precio)
        await venta.increment('total', { by: detalle.subtotal, transaction: options.transaction })
      }
    }
  })
  return DetalleVenta
}
