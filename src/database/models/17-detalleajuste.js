'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class DetalleAjuste extends Model {
    static associate (models) {
      DetalleAjuste.belongsTo(models.AjusteInventario, {
        foreignKey: 'id_ajuste',
        as: 'detalleAjuste'
      })

      DetalleAjuste.belongsTo(models.Producto, {
        foreignKey: 'id_producto',
        as: 'ajusteProducto'
      })
    }
  }
  DetalleAjuste.init({
    id_ajuste: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'AjusteInventario',
        key: 'id'
      }
    },
    id_producto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Producto',
        key: 'id'
      }
    },
    cantidad_antes: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cantidad_ahora: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'DetalleAjuste',
    tableName: 'DetalleAjuste'
  })
  return DetalleAjuste
}
