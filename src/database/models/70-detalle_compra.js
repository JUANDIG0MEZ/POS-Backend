const { number } = require('joi')
const { Model } = require('sequelize')

'use strict'

module.exports = (sequelize, DataTypes) => {
  class DetalleCompra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      DetalleCompra.belongsTo(models.Compra, {
        foreignKey: 'compra_id',
        as: 'compraDetalle'

      })

      DetalleCompra.belongsTo(models.Producto, {
        foreignKey: 'producto_id',
        as: 'productoDetalleCompra'
      })
    }
  }
  DetalleCompra.init({
    compra_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Compra',
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
      allowNull: true,
      validate: {
        min: 0
      }
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'DetalleCompra',
    tableName: 'DetalleCompra',
    hooks: {

      beforeCreate: async (detalle, options) => {
        // Crear una instancia de Producto y Compra
        const Producto = detalle.sequelize.models.Producto

        const producto = await Producto.findByPk(detalle.producto_id, {
          transaction: options.transaction,
          lock: options.transaction.LOCK.UPDATE
        })

        const Compra = detalle.sequelize.models.Compra
        const compra = await Compra.findByPk(detalle.compra_id, {
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
