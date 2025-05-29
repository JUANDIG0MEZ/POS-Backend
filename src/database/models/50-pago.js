const { Model } = require('sequelize');

'use strict';


module.exports = (sequelize, DataTypes) => {
  class Pago extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pago.belongsTo(models.Cliente, {
        foreignKey: 'cliente_id',
        as: 'clientePago'
      })
    }
  }
  Pago.init({
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    hora: {
      type: DataTypes.TIME,
      allowNull: false,
    },

    cliente_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Cliente',
        key: 'id'
      }
    },
    valor: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        min: 0
      }
    }

  }, {
    sequelize,
    modelName: 'Pago',
    tableName: 'Pago',
    timestamps: false,

  });
  return Pago;
};