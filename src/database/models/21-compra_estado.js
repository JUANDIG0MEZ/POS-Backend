'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompraEstado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CompraEstado.hasMany(models.Compra, {
        foreignKey: 'estado_id',
        as: 'estadoCompra'
      })
    }
  }
  CompraEstado.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CompraEstado',
    timestamps: false,
    tableName: 'compras_estados'
    
  });
  return CompraEstado;
};