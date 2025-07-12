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
    modelName: 'DetalleCompra',
    tableName: 'DetalleCompra',
    hooks: {
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

        const cantidadDetalle = detalle.cantidad
        const cantidadProducto = producto.cantidad
        const precioDetalle = detalle.precio

        producto.cantidad = cantidadProducto + cantidadDetalle
        await producto.save({ transaction: options.transaction })

        detalle.subtotal = cantidadDetalle * precioDetalle
        compra.total = compra.total + detalle.subtotal
        await compra.save({ transaction: options.transaction })
      }

    }
  })
  return DetalleCompra
}
