
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClienteTipo extends Model {
    static associate(models) {
      ClienteTipo.hasMany(models.Cliente, {
        foreignKey: 'tipo_id'
      })
    }
  }
  ClienteTipo.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ClienteTipo',
    tableName: 'clientes_tipos',
  });
  return ClienteTipo;
};