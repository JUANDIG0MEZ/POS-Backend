'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class VentaEstadoPago extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      VentaEstadoPago.hasMany(models.Venta, {
        foreignKey: 'estado_pago_id',
        as: 'estadoPagoVenta'
      })
    }
  }
  VentaEstadoPago.init({
    nombre: DataTypes.STRING(200)
  }, {
    sequelize,
    modelName: 'VentaEstadoPago',
    timestamps: false,
    tableName: 'VentaEstadoPago'
  })
  return VentaEstadoPago
}
