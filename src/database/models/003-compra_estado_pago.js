'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class CompraEstadoPago extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      CompraEstadoPago.hasMany(models.Compra, {
        foreignKey: 'estado_pago_id',
        as: 'estadoPagoCompra'
      })
    }
  }
  CompraEstadoPago.init({
    nombre: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  }, {
    sequelize,
    modelName: 'CompraEstadoPago',
    timestamps: false,
    tableName: 'CompraEstadoPago'
  })
  return CompraEstadoPago
}
