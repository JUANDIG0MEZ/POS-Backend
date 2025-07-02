'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class CompraEstadoPago extends Model {
    static associate (models) {
      CompraEstadoPago.hasMany(models.Compra, {
        foreignKey: 'id_estado_pago',
        as: 'estadoPagoCompra'
      })
    }
  }
  CompraEstadoPago.init({
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    }

  }, {
    sequelize,
    modelName: 'CompraEstadoPago',
    timestamps: false,
    tableName: 'CompraEstadoPago'
  })
  return CompraEstadoPago
}
