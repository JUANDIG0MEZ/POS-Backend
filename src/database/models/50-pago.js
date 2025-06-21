'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Pago extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
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
      allowNull: false
    },
    hora: {
      type: DataTypes.TIME,
      allowNull: false
    },

    cliente_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      references: {
        model: 'Cliente',
        key: 'id'
      }
    },
    valor: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      validate: {
        min: 0
      }
    },

    metodo_pago_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'MetodoPago',
        key: 'id'
      }
    },

    descripcion: {
      type: DataTypes.STRING(200),
      allowNull: true
    }

  }, {
    sequelize,
    modelName: 'Pago',
    tableName: 'Pago',
    timestamps: false,

    hooks: {
      beforeCreate: async (pago, options) => {
        const metodoPago = Number(pago.metodo_pago_id)
        const valor = Number(pago.valor)
        const clienteId = Number(pago.cliente_id)

        if (valor <= 0) {
          throw new Error('El valor del pago no puede ser 0')
        }
        if (!(metodoPago < 2) && !pago.descripcion) {
          throw new Error('Se debe agregar informacion del pago')
        }
        if (!pago.fecha || !pago.hora) {
          throw new Error('La fecha y hora son requeridas')
        }
        if (!clienteId) {
          throw new Error('El cliente es requerido')
        }
        if (!metodoPago) {
          throw new Error('El método de pago es requerido')
        }
      }
    }
  })

  return Pago
}
