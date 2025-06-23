'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class MetodoPago extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      MetodoPago.hasMany(models.Pago, {
        foreignKey: 'metodo_pago_id',
        as: 'pagoMetodoPago'
      })

      MetodoPago.hasMany(models.Abono, {
        foreignKey: 'metodo_pago_id',
        as: 'abonoMetodoPago'
      })
    }
  }
  MetodoPago.init({
    nombre: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  }, {
    sequelize,
    modelName: 'MetodoPago',
    tableName: 'MetodoPago',
    timestamps: false
  })
  return MetodoPago
}
