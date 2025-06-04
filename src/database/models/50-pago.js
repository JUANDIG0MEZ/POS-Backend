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

      Pago.belongsTo(models.MetodoPago, {
        foreignKey: 'metodo_pago_id',
        as: 'pagoMetodoPago'
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
    },

    metodo_pago_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'MetodoPago',
        key: 'id'
      }
    },

    descripcion: {
      type: DataTypes.STRING,
      allowNull: true
    }

  }, {
    sequelize,
    modelName: 'Pago',
    tableName: 'Pago',
    timestamps: false,

    hooks: {
      beforeCreate: async (pago, options) => {
      if (pago.valor === 0) {
        throw new Error("El valor del pago no puede ser 0");
      }
      if (!(pago.metodo_pago_id == 0 || pago.metodo_pago_id == 1) && !pago.descripcion){
        throw new Error("Se debe agregar informacion del pago")
      }
      else {
        pago.descripcion = ""
      }
      if (!pago.fecha || !pago.hora) {
        throw new Error("La fecha y hora son requeridas");
      }
      if (!pago.cliente_id) {
        throw new Error("El cliente es requerido");
      }
      if (!pago.metodo_pago_id) {
        throw new Error("El método de pago es requerido");
      }
    }
    }
  });

  return Pago;
};