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
        foreignKey: 'id_metodo_pago',
        as: 'pagoMetodoPago'
      })

      MetodoPago.hasMany(models.Abono, {
        foreignKey: 'id_metodo_pago',
        as: 'abonoMetodoPago'
      })
    }
  }
  MetodoPago.init({
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'MetodoPago',
    tableName: 'MetodoPago',
    timestamps: false
  })
  return MetodoPago
}
