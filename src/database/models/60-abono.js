
'use strict';
const {
  Model
} = require('sequelize');
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
        model: 'clientes',
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
    modelName: 'Abono',
    tableName: 'abonos',
    timestamps: false,
    hooks: {
      // beforeCreate: async (abono, options) => {
      //   // 
      //   const Cliente = abono.sequelize.models.Cliente; // Obtener el modelo Cliente
      //   const cliente = await Cliente.findByPk(abono.cliente_id, {
      //     transaction: options.transaction,
      //     lock: options.transaction.LOCK.UPDATE
      //   })


      //   const valorAbono = abono.valor

      //   if (valorAbono > cliente.debe){
      //     throw new Error('El valor del abono no puede ser mayor al valro de la deuda');
      //   }

      //   cliente.debe = cliente.debe - valorAbono;

      //   await cliente.save({transaction: options.transaction})


      // }

    }
  });
  return Abono;
};