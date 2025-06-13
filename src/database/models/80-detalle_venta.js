const { number } = require('joi')
const { Model } = require('sequelize')

'use strict'

module.exports = (sequelize, DataTypes) => {
  class DetalleVenta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      DetalleVenta.belongsTo(models.Venta, {
        foreignKey: 'venta_id',
        as: 'ventaDetalle'
      }),

      DetalleVenta.belongsTo(models.Producto, {
        foreignKey: 'producto_id',
        as: 'productoDetalleVenta'
      })
    }
  }
  DetalleVenta.init({
    venta_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Venta',
        key: 'id'
      }
    },
    producto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Producto',
        key: 'id'
      }
    },
    cantidad: {
      type: DataTypes.DECIMAL(10, 0),
      allowNull: false,
      validate: {
        min: 0
      }
    },
    precio: {
      type: DataTypes.DECIMAL(10, 0),
      allowNull: false,
      validate: {
        min: 0
      }
    },
    subtotal: {
      type: DataTypes.DECIMAL(12, 0),
      allowNull: false,
      validate: {
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
        // Crear una instancia de Producto y Compra
        const Producto = detalle.sequelize.models.Producto

        const producto = await Producto.findByPk(detalle.producto_id, {
          transaction: options.transaction,
          lock: options.transaction.LOCK.UPDATE
        })

        const Venta = detalle.sequelize.models.Venta
        const venta = await Venta.findByPk(detalle.venta_id, {
          transaction: options.transaction,
          lock: options.transaction.LOCK.UPDATE
        })

        const cantidadDetalle = Number(detalle.cantidad)
        const cantidadProducto = Number(producto.cantidad)
        const precio = Number(detalle.precio)

        producto.cantidad = cantidadProducto - cantidadDetalle

        await producto.save({ transaction: options.transaction })

        detalle.subtotal = cantidadDetalle * precio
        venta.total = Number(venta.total) + detalle.subtotal

        await venta.save({ transaction: options.transaction })
      }
    }
  })
  return DetalleVenta
}
