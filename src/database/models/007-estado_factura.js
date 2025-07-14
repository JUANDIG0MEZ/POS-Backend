'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class EstadoFactura extends Model {
    static associate (models) {
      EstadoFactura.hasMany(models.Compra, {
        foreignKey: 'id_estado_factura',
        as: 'estadoFacturaCompra'
      })

      EstadoFactura.hasMany(models.Venta, {
        foreignKey: 'id_estado_factura',
        as: 'estadoFacturaVenta'
      })
    }
  }
  EstadoFactura.init({
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'EstadoFactura',
    tableName: 'EstadoFactura',
    timestamps: false
  })
  return EstadoFactura
}
