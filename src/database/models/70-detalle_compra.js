'use strict'

const { Model } = require('sequelize')
const { multiplicarYRedondear, esNumeroSeguro } = require('../../utils/decimales')
module.exports = (sequelize, DataTypes) => {
  class DetalleCompra extends Model {
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
        esNumeroSeguro,
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
        esNumeroSeguro,
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
        esNumeroSeguro,
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

        await producto.increment('cantidad', { by: detalle.cantidad, transaction: options.transaction })

        detalle.subtotal = multiplicarYRedondear(detalle.cantidad, detalle.precio)
        await compra.increment('total', { by: detalle.subtotal, transaction: options.transaction })
      }

    }
  })
  return DetalleCompra
}
