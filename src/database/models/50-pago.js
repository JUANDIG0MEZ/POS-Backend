'use strict'

const { Model } = require('sequelize')
const { esNumeroSeguro } = require('../../utils/decimales')
module.exports = (sequelize, DataTypes) => {
  class Pago extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Pago.belongsTo(models.Usuario, {
        foreignKey: 'id_usuario',
        as: 'usuarioPago'
      })
      Pago.belongsTo(models.Cliente, {
        foreignKey: 'id_cliente',
        as: 'clientePago'
      })

      Pago.belongsTo(models.MetodoPago, {
        foreignKey: 'id_metodo_pago',
        as: 'pagoMetodoPago'
      })
    }
  }
  Pago.init({
    pago_id: {
      type: DataTypes.INTEGER.UNSIGNED,
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
    id_cliente: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Cliente',
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
    },
    valor: {
      type: DataTypes.DECIMAL(15, 3),
      allowNull: false,
      get () {
        return Number(this.getDataValue('valor'))
      },
      validate: {
        esNumeroSeguro
      }
    },
    id_metodo_pago: {
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
        if (pago.valor <= 0) throw new Error('El valor del pago no puede ser 0')
        if (!pago.id_metodo_pago) throw new Error('El método de pago es requerido')
        if (pago.id_metodo_pago > 1 && !pago.descripcion) throw new Error('Se debe agregar informacion del pago')
        if (!pago.fecha || !pago.hora) throw new Error('La fecha y hora son requeridas')
        if (!pago.id_cliente) throw new Error('El cliente es requerido')
      }
    }
  })

  return Pago
}
