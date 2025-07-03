'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Compra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Compra.belongsTo(models.Usuario, {
        foreignKey: 'id_usuario',
        as: 'usuarioCompra'
      })

      Compra.belongsTo(models.Cliente, {
        foreignKey: 'id_cliente',
        as: 'clienteCompra'
      })

      Compra.hasMany(models.DetalleCompra, {
        foreignKey: 'id_compra',
        as: 'compraDetalle'
      })
      Compra.belongsTo(models.CompraEstadoEntrega,
        {
          foreignKey: 'id_estado_entrega',
          as: 'estadoEntregaCompra'
        }
      )

      Compra.belongsTo(models.CompraEstadoPago, {
        foreignKey: 'id_estado_pago',
        as: 'estadoPagoCompra'
      })
    }
  }
  Compra.init({
    compra_id: {
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
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    hora: {
      type: DataTypes.TIME,
      allowNull: false
    },
    id_cliente: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Cliente',
        key: 'id'
      }
    },
    pagado: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    total: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    por_pagar: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    id_estado_entrega: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: 'CompraEstadoEntrega',
        key: 'id'
      }
    },
    id_estado_pago: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: 'CompraEstadoPago',
        key: 'id'
      }
    },

    nombre_cliente: {
      type: DataTypes.STRING(100),
      allowNull: false
    }

  }, {
    sequelize,
    modelName: 'Compra',
    tableName: 'Compra',
    timestamps: false,
    hooks: {
      beforeUpdate: async (compra, options) => {
        if (compra.changed('pagado') || compra.changed('total')) {
          let pagado = compra.changed('pagado') ? compra.pagado : Number(compra.previous('pagado'))
          const total = compra.changed('total') ? compra.total : Number(compra.previous('total'))

          if (pagado > total) pagado = total

          const porPagar = total - pagado
          compra.pagado = pagado
          compra.por_pagar = porPagar

          const idCliente = compra.get('id_cliente')
          const Cliente = compra.sequelize.models.Cliente

          const cliente = await Cliente.findByPk(idCliente, {
            transaction: options.transaction,
            lock: options.transaction.LOCK.UPDATE
          })
          cliente.por_pagarle = cliente.por_pagarle - compra.previous('por_pagar') + porPagar
          await cliente.save({ transaction: options.transaction })

          if (compra.por_pagar > 0) compra.id_estado_pago = 1
          else compra.id_estado_pago = 2
        }
      },

      beforeCreate: async (compra, options) => {
        const clienteId = compra.cliente_id
        if (clienteId < 2 && !compra.nombre_cliente) throw new Error('Nombre de cliente invalido')
      }
    }
  })
  return Compra
}
