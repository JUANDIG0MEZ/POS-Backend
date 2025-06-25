'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class CompraEstadoEntrega extends Model {
    static associate (models) {
      CompraEstadoEntrega.hasMany(models.Compra, {
        foreignKey: 'estado_entrega_id',
        as: 'estadoEntregaCompra'
      })
    }
  }
  CompraEstadoEntrega.init({
    nombre: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  }, {
    sequelize,
    modelName: 'CompraEstadoEntrega',
    timestamps: false,
    tableName: 'CompraEstadoEntrega'

  })
  return CompraEstadoEntrega
}
