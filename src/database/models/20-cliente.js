'use strict'

const { Model } = require('sequelize')
const { ErrorUsuario } = require('../../errors/usuario')

module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    static associate (models) {
      Cliente.belongsTo(models.ClienteTipo, {
        foreignKey: 'id_tipo',
        as: 'tipoCliente'
      })

      Cliente.hasMany(models.Compra, {
        foreignKey: 'id_cliente',
        as: 'clienteCompra'
      })

      Cliente.hasMany(models.Venta, {
        foreignKey: 'id_cliente',
        as: 'clienteVenta'
      })

      Cliente.hasMany(models.Pago, {
        foreignKey: 'id_cliente',
        as: 'clientePago'
      })

      Cliente.hasMany(models.Abono, {
        foreignKey: 'id_cliente',
        as: 'clienteAbono'
      })

      Cliente.belongsTo(models.Usuario, {
        foreignKey: 'id_usuario',
        as: 'usuarioCliente'
      })
    }
  }
  Cliente.init({
    id_usuario: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Usuario',
        key: 'id'
      }
    },
    cliente_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    direccion: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    telefono: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    id_tipo: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'ClienteTipo',
        key: 'id'
      }

    },
    por_pagarle: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0

    },
    debe: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    }

  }, {
    sequelize,
    modelName: 'Cliente',
    timestamps: false,
    tableName: 'Cliente'

  })
  return Cliente
}
