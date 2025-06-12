'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class NotaAjuste extends Model {
    static associate (models) {
      // define association here
    }
  }
  NotaAjuste.init({
    categoria_id: DataTypes.INTEGER,
    motivo: DataTypes.STRING,
    total: DataTypes.INTEGER,
    usuario_creador: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'NotaAjuste',
    tableName: 'NotaAjuste'
  })
  return NotaAjuste
}
