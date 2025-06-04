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

      beforeUpdate: async (detalle, options) => {
        if (detalle.changed('venta_id') || detalle.changed('producto_id')) {
          throw new Error('No se puede modificar el id de la venta o del producto')
        }

        const cantidadAntes = detalle.changed('cantidad') ? Number(detalle.previous('cantidad')) : Number(detalle.cantidad)
        const cantidadAhora = Number(detalle.cantidad)
        const precioAhora = Number(detalle.precio)
        const subtotalAntes = detalle.changed('subtotal') ? Number(detalle.previous('subtotal')) : Number(detalle.subtotal)
        const subtotalAhora = precioAhora * cantidadAhora

        // Se actualiza el subtotal
        detalle.subtotal = subtotalAhora

        // Crear una instancia de Compra para modificar el total
        const Venta = detalle.sequelize.models.Venta
        const venta = await Venta.findByPk(detalle.venta_id,
          {
            transaction: options.transaction,
            lock: options.transaction.LOCK.UPDATE
          })

        venta.total = Number(venta.total) - subtotalAntes + subtotalAhora

        await venta.save({ transaction: options.transaction })

        // Crear una instancia de Producto para modificar la cantidad
        const Producto = detalle.sequelize.models.Producto
        const producto = await Producto.findByPk(detalle.producto_id, {
          transaction: options.transaction,
          lock: options.transaction.LOCK.UPDATE
        })

        if (detalle.cantidad('cantidad')) {
          producto.cantidad = Number(producto.cantidad) + cantidadAntes - cantidadAhora
          await producto.save({ transaction: options.transaction })
        }
      },

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
