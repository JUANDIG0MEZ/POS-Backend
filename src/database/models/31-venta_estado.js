'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VentaEstado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      VentaEstado.hasMany(models.VentaEstado, {
        as: 'estadoVenta',
        foreignKey: 'estado_id'
      })
    }
  }
  VentaEstado.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'VentaEstado',
    timestamps: false,
    tableName: 'ventas_estados',

  });
  return VentaEstado;
};