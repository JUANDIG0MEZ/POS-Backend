'use strict'

const { Model } = require('sequelize')
const { esNumeroSeguro } = require('../../utils/decimales.js')
module.exports = (sequelize, DataTypes) => {
  class Compra extends Model {
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

      Compra.belongsTo(models.EstadoFactura, {
        foreignKey: 'id_estado_factura',
        as: 'estadoFacturaCompra'
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
      type: DataTypes.DECIMAL(15, 3),
      allowNull: false,
      defaultValue: 0,
      validate: {
        esNumeroSeguro
      }
    },
    total: {
      type: DataTypes.DECIMAL(15, 3),
      allowNull: false,
      defaultValue: 0,
      validate: {
        esNumeroSeguro
      }
    },
    por_pagar: {
      type: DataTypes.DECIMAL(15, 3),
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
    },
    id_estado_factura: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 1,
      references: {
        key: 'id',
        model: 'EstadoFactura'
      }
    }

  }, {
    sequelize,
    modelName: 'Compra',
    tableName: 'Compra',
    timestamps: false,
    hooks: {
      beforeUpdate: async (compra, options) => {
        if (compra.changed('pagado')) {
          const nuevoPorPagar = compra.total - compra.pagado

          const Cliente = compra.sequelize.models.Cliente
          const cliente = await Cliente.findByPk(compra.id_cliente, {
            transaction: options.transaction,
            lock: options.transaction.LOCK.UPDATE
          })

          await cliente.increment('por_pagarle', { by: nuevoPorPagar - compra.por_pagar, transaction: options.transaction })

          compra.por_pagar = nuevoPorPagar
          if (compra.por_pagar > 0) compra.id_estado_pago = 1
          else compra.id_estado_pago = 2
        }
      },

      beforeCreate: async (compra, options) => {
        if (compra.cliente_id < 2 && !compra.nombre_cliente) throw new Error('Nombre de cliente invalido')
      }
    }
  })
  return Compra
}
