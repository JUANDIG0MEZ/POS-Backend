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
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    precio: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    subtotal: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'DetalleVenta',
    tableName: 'DetalleVenta',
    hooks: {
      beforeUpdate: async (detalle, options) => {
        const cantidadAntes = detalle.changed('cantidad') ? Number(detalle.previous('cantidad')) : detalle.cantidad
        const cantidadAhora = detalle.cantidad
        const precioAhora = detalle.precio
        const subtotalAntes = detalle.changed('subtotal') ? Number(detalle.previous('subtotal')) : detalle.subtotal
        const subtotalAhora = precioAhora * cantidadAhora

        // Se actualiza el subtotal
        detalle.subtotal = subtotalAhora

        // Crear una instancia de Compra para modificar el total
        const Venta = detalle.sequelize.models.Venta
        const venta = await Venta.findByPk(detalle.id_venta, { transaction: options.transaction, lock: options.transaction.LOCK.UPDATE })

        venta.total = venta.total - subtotalAntes + subtotalAhora
        await venta.save({ transaction: options.transaction })

        // Crear una instancia de Producto para modificar la cantidad
        const Producto = detalle.sequelize.models.Producto
        const producto = await Producto.findByPk(detalle.id_producto, {
          transaction: options.transaction,
          lock: options.transaction.LOCK.UPDATE
        })

        if (detalle.changed('cantidad')) {
          producto.cantidad = producto.cantidad + cantidadAntes - cantidadAhora
          await producto.save({ transaction: options.transaction })
        }
      },

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
