const { Model } = require('sequelize');

'use strict';

module.exports = (sequelize, DataTypes) => {
  class CompraEstadoEntrega extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CompraEstadoEntrega.hasMany(models.Compra, {
        foreignKey: 'estado_entrega_id',
        as: 'estadoCompra'
      })
    }
  }
  CompraEstadoEntrega.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CompraEstadoEntrega',
    timestamps: false,
    tableName: 'CompraEstadoEntrega'
    
  });
  return CompraEstadoEntrega;
};