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
        foreignKey: 'id_usuario',
        as: 'usuarioAbono'
      })
      Abono.belongsTo(models.Cliente, {
        foreignKey: 'id_cliente',
        as: 'clienteAbono'
      })

      Abono.belongsTo(models.MetodoPago, {
        foreignKey: 'id_metodo_pago',
        as: 'abonoMetodoPago'
      })
    }
  }
  Abono.init({
    abono_id: {
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
    modelName: 'Abono',
    tableName: 'Abono',
    timestamps: false,

    hooks: {
      beforeCreate: async (abono, options) => {
        const metodoPago = Number(abono.id_metodo_pago)
        const valor = Number(abono.valor)
        const idCliente = Number(abono.id_cliente)

        if (valor <= 0) throw new Error('El valor del abono no puede ser 0')
        if (metodoPago > 1 && !abono.descripcion) throw new Error('Se debe agregar informacion del abono')
        if (!abono.fecha || !abono.hora) throw new Error('La fecha y hora son requeridas')
        if (!idCliente) throw new Error('El cliente es requerido')
        if (!metodoPago) throw new Error('El método de pago es requerido')
      }
    }
  })
  return Abono
}
