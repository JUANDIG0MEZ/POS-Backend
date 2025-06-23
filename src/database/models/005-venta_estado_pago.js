'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class VentaEstadoPago extends Model {
    static associate (models) {
      VentaEstadoPago.hasMany(models.Venta, {
        foreignKey: 'estado_pago_id',
        as: 'estadoPagoVenta'
      })
    }
  }
  VentaEstadoPago.init({
    nombre: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  }, {
    sequelize,
    modelName: 'VentaEstadoPago',
    timestamps: false,
    tableName: 'VentaEstadoPago'
  })
  return VentaEstadoPago
}
