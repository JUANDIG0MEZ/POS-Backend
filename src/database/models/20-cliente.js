'use strict'

const { Model } = require('sequelize')
const { ErrorUsuario } = require('../../errors/ErrorUsuario')

module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    static associate (models) {
      Cliente.belongsTo(models.ClienteTipo, {
        foreignKey: 'tipo_id',
        as: 'tipoCliente'
      })

      Cliente.hasMany(models.Compra, {
        foreignKey: 'cliente_id',
        as: 'clienteCompra'
      })

      Cliente.hasMany(models.Venta, {
        foreignKey: 'cliente_id',
        as: 'clienteVenta'
      })

      Cliente.hasMany(models.Pago, {
        foreignKey: 'cliente_id',
        as: 'clientePago'
      })

      Cliente.hasMany(models.Abono, {
        foreignKey: 'cliente_id',
        as: 'clienteAbono'
      })
    }
  }
  Cliente.init({
    nombre: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: true,
      set (value) {
        this.setDataValue('nombre', value.toLowerCase().trim())
      },
      get () {
        const nombre = this.getDataValue('nombre')
        return nombre ? nombre.replace(/\b\w/g, (char) => char.toUpperCase()) : ''
      }
    },
    direccion: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    telefono: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    tipo_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 3,
      references: {
        model: 'clientes_tipos',
        key: 'id'
      }
    },
    por_pagarle: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        isInt: true
      }
    },
    debe: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        isInt: true
      }
    }

  }, {
    sequelize,
    modelName: 'Cliente',
    timestamps: false,
    tableName: 'Cliente',
    hooks: {
      beforeCreate (cliente) {
        const tipoId = Number(cliente.tipo_id)
        const telefono = Number(cliente.tipo_id)

        if (!tipoId) {
          throw new ErrorUsuario('Tipo de usuario invalido')
        }
        if (!cliente.nombre) {
          throw new ErrorUsuario('Nombre invalido')
        }
        if (telefono === 0) {
          cliente.telefono = null
        } else if (!telefono) {
          throw new ErrorUsuario('Telefono invalido')
        }
      }
    }
  })
  return Cliente
}
