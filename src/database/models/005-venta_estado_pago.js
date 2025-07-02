'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class VentaEstadoPago extends Model {
    static associate (models) {
      VentaEstadoPago.hasMany(models.Venta, {
        foreignKey: 'id_estado_pago',
        as: 'estadoPagoVenta'
      })
    }
  }
  VentaEstadoPago.init({
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'VentaEstadoPago',
    timestamps: false,
    tableName: 'VentaEstadoPago'
  })
  return VentaEstadoPago
}
