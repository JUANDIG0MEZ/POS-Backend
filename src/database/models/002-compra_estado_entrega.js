'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class CompraEstadoEntrega extends Model {
    static associate (models) {
      CompraEstadoEntrega.hasMany(models.Compra, {
        foreignKey: 'id_estado_entrega',
        as: 'estadoEntregaCompra'
      })
    }
  }
  CompraEstadoEntrega.init({
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'CompraEstadoEntrega',
    timestamps: false,
    tableName: 'CompraEstadoEntrega'

  })
  return CompraEstadoEntrega
}
