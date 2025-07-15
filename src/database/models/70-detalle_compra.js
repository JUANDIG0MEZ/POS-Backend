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
    modelName: 'DetalleCompra',
    tableName: 'DetalleCompra',
    hooks: {
    }
  })
  return DetalleCompra
}
