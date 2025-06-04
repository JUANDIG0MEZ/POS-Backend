const { Model } = require('sequelize');

'use strict';

module.exports = (sequelize, DataTypes) => {
  class VentaEstadoEntrega extends Model {

    static associate(models) {
      VentaEstadoEntrega.hasMany(models.Venta, {
        foreignKey: 'estado_entrega_id',
        as: 'estadoEntregaVenta',
      })
    }
  }
  VentaEstadoEntrega.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'VentaEstadoEntrega',
    timestamps: false,
    tableName: 'VentaEstadoEntrega',

  });
  return VentaEstadoEntrega;
};