'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VentasEstados extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      VentasEstados.hasMany(models.VentasEstados, {
        as: 'estadoVenta',
        foreignKey: 'estado_id'
      })
    }
  }
  VentasEstados.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'VentasEstados',
    timestamps: false,
    tableName: 'ventas_estados',

  });
  return VentasEstados;
};