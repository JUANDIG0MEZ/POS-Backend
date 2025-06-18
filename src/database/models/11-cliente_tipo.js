'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class ClienteTipo extends Model {
    static associate (models) {
      ClienteTipo.hasMany(models.Cliente, {
        foreignKey: 'tipo_id',
        as: 'tipoCliente'
      })
    }
  }
  ClienteTipo.init({
    nombre: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: true,

      set (value) {
        this.setDataValue('nombre', value.toLowerCase().trim())
      },

      get () {
        const nombre = this.getDataValue('nombre')
        return nombre ? nombre.charAt(0).toUpperCase() + nombre.slice(1) : ''
      }
    }
  }, {
    sequelize,
    modelName: 'ClienteTipo',
    tableName: 'ClienteTipo',
    timestamps: false
  })
  return ClienteTipo
}
