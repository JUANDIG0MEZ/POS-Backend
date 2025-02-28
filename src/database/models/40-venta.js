'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Venta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Venta.belongsTo(models.Cliente, {
        foreignKey: 'cliente_id'
      })

      Venta.hasMany(models.DetalleVenta, {
        foreignKey: 'venta_id'
      })
    }
  }
  Venta.init({
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
        model: 'clientes',
        key: 'id'
      }
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Recogido en tienda',
    },
    por_pagar: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    total: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pendiente'
    },
  }, {
    sequelize,
    modelName: 'Venta',
    tableName: 'ventas',
    timestamps: false
  });
  return Venta;
};