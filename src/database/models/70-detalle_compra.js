'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetalleCompra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DetalleCompra.belongsTo(models.Compra, {
        foreignKey: 'compra_id',
        as: 'compraDetalle'

      })

      DetalleCompra.belongsTo(models.Producto, {
        foreignKey: 'producto_id',
        as: 'productoDetalle'
      })
    }
  }
  DetalleCompra.init({
    compra_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'compras',
        key: 'id'
      }
    },
    producto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'productos',
        key: 'id'
      }
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    medida: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.DECIMAL(10, 0),
      allowNull: false,
      validate: {
        min: 1
      }
    },
    precio: {
      type: DataTypes.DECIMAL(10, 0),
      allowNull: false,
      validate: {
        min: 1
      }
    },
    subtotal: {
      type: DataTypes.DECIMAL(12, 0),
      allowNull: false,
      validate: {
        min: 1
      }
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'DetalleCompra',
    tableName: 'detalles_compras',
    hooks: {
      beforeCreate: (detalle) => {
        detalle.subtotal = detalle.cantidad * detalle.precio
      },
      beforeUpdate: (detalle) => {
        detalle.subtotal = detalle.cantidad * detalle.precio
      }
    }, 
  });
  return DetalleCompra;
};