const { Model } = require('sequelize');


'use strict';

module.exports = (sequelize, DataTypes) => {
  class Abono extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Abono.belongsTo(models.Cliente, {
        foreignKey: 'cliente_id',
        as: 'clienteAbono'
      })

      Abono.belongsTo(models.MetodoPago, {
        foreignKey: 'metodo_pago_id',
        as: 'abonoMetodoPago'
      })
    }
  }
  Abono.init({
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
    modelName: 'Abono',
    tableName: 'Abono',
    timestamps: false,

    hooks: {
      beforeCreate: async (abono, options) => {
      if (abono.valor === 0) {
        throw new Error("El valor del abono no puede ser 0");
      }
      if (!(abono.metodo_pago_id == 0 || abono.metodo_pago_id == 1) && !abono.descripcion){
        throw new Error("Se debe agregar informacion del abono")
      }
      else{
        abono.descripcion = ""
      }
      if (!abono.fecha || !abono.hora) {
        throw new Error("La fecha y hora son requeridas");
      }
      if (!abono.cliente_id) {
        throw new Error("El cliente es requerido");
      }
      if (!abono.metodo_pago_id) {
        throw new Error("El método de pago es requerido");
      }
    }
    }
  });
  return Abono;
};