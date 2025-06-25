'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Abono extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Abono.belongsTo(models.Usuario, {
        foreignKey: 'usuario_id',
        as: 'usuarioAbono'
      })
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
    abono_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    usuario_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Usuario',
        key: 'id'
      }
    },
    cliente_id: {
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
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
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
    modelName: 'Abono',
    tableName: 'Abono',
    timestamps: false,

    hooks: {
      beforeCreate: async (abono, options) => {
        const metodoPago = Number(abono.metodo_pago_id)
        const valor = Number(abono.valor)
        const clienteId = Number(abono.cliente_id)

        if (valor <= 0) {
          throw new Error('El valor del abono no puede ser 0')
        }
        if (metodoPago > 1 && !abono.descripcion) {
          throw new Error('Se debe agregar informacion del abono')
        }
        if (!abono.fecha || !abono.hora) {
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
  return Abono
}
