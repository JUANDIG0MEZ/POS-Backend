'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class AjusteInventario extends Model {
    static associate (models) {
      AjusteInventario.belongsTo(models.Usuario, {
        foreignKey: 'id_usuario',
        as: 'ajusteUsuario'
      })

      AjusteInventario.hasMany(models.DetalleAjuste, {
        foreignKey: 'id_ajuste',
        as: 'detalleAjuste'
      })
    }
  }
  AjusteInventario.init({
    ajuste_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false
    },
    id_usuario: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Usuario',
        key: 'id'
      }
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    hora: {
      type: DataTypes.TIME,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'AjusteInventario',
    tableName: 'AjusteInventario',
    timestamps: false
  })
  return AjusteInventario
}
