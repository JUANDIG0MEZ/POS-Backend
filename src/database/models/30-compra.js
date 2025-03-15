'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Compra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Compra.belongsTo(models.Cliente, {
        foreignKey: "cliente_id",
        as: 'clienteCompra'
      })

      Compra.hasMany(models.DetalleCompra, {
        foreignKey: 'compra_id',
        as: 'compraDetalle'
      })
      Compra.belongsTo(models.CompraEstado,
        {
          foreignKey: 'estado_id',
          as: 'estadoCompra'
        }
      )
    }
  }
  Compra.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    hora: {
      type: DataTypes.TIME,
      allowNull: false
    },
    cliente_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'clientes',
        key: 'id'
      }
    },
    pagado: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
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
    estado_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: 'compras_estados',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'Compra',
    tableName: 'compras',
    timestamps: false
  });
  return Compra;
};