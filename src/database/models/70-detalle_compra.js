'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class DetalleCompra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      DetalleCompra.belongsTo(models.Compra, {
        foreignKey: 'id_compra',
        as: 'compraDetalle'

      })

      DetalleCompra.belongsTo(models.Producto, {
        foreignKey: 'id_producto',
        as: 'productoDetalleCompra'
      })
    }
  }
  DetalleCompra.init({

    id_compra: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Compra',
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
    modelName: 'DetalleCompra',
    tableName: 'DetalleCompra',
    hooks: {
      beforeUpdate: async (detalle, options) => {
        const cantidadAntes = detalle.changed('cantidad') ? Number(detalle.previous('cantidad')) : detalle.cantidad
        const cantidadAhora = detalle.cantidad
        const precioAhora = detalle.precio
        const subtotalAntes = detalle.changed('subtotal') ? Number(detalle.previous('subtotal')) : detalle.subtotal
        const subtotalAhora = cantidadAhora * precioAhora

        // Se actualiza el subtotal
        detalle.subtotal = subtotalAhora

        // Crear una instancia de Compra para modificar el total
        const Compra = detalle.sequelize.models.Compra
        const compra = await Compra.findByPk(detalle.id_compra, { transaction: options.transaction, lock: options.transaction.LOCK.UPDATE })

        // Modificar el total de la compra
        compra.total = compra.total - subtotalAntes + subtotalAhora
        await compra.save({ transaction: options.transaction })

        console.log('entreto al hook', detalle.dataValues)
        // Modificar el stock del producto si la cantidad ha cambiado

        const Producto = detalle.sequelize.models.Producto
        const producto = await Producto.findByPk(detalle.id_producto, {
          transaction: options.transaction,
          lock: options.transaction.LOCK.UPDATE
        })

        if (detalle.changed('cantidad')) {
          producto.cantidad = producto.cantidad - cantidadAntes + cantidadAhora
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
        const Compra = detalle.sequelize.models.Compra
        const compra = await Compra.findByPk(detalle.id_compra, {
          transaction: options.transaction,
          lock: options.transaction.LOCK.UPDATE
        })

        const cantidadDetalle = Number(detalle.cantidad)
        const cantidadProducto = Number(producto.cantidad)
        const precioDetalle = Number(detalle.precio)

        producto.cantidad = cantidadProducto + cantidadDetalle
        await producto.save({ transaction: options.transaction })

        detalle.subtotal = cantidadDetalle * precioDetalle
        compra.total = Number(compra.total) + detalle.subtotal
        await compra.save({ transaction: options.transaction })
      }

    }
  })
  return DetalleCompra
}
