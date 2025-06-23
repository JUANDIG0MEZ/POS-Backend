'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Venta extends Model {
    static associate (models) {
      Venta.belongsTo(models.Usuario, {
        foreignKey: 'usuario_id',
        as: 'usuarioVenta'
      })
      Venta.belongsTo(models.Cliente, {
        foreignKey: 'cliente_id',
        as: 'clienteVenta'
      })

      Venta.hasMany(models.DetalleVenta, {
        foreignKey: 'venta_id',
        as: 'ventaDetalle'
      })

      Venta.belongsTo(models.VentaEstadoPago, {
        foreignKey: 'estado_pago_id',
        as: 'estadoPagoVenta'
      })

      Venta.belongsTo(models.VentaEstadoEntrega, {
        foreignKey: 'estado_entrega_id',
        as: 'estadoEntregaVenta'
      })
    }
  }
  Venta.init({
    usuario_id: {
      type: DataTypes.TINYINT.UNSIGNED,
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
    cliente_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Cliente',
        key: 'id'
      }
    },
    pagado: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        isInt: true
      }
    },
    total: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        isInt: true
      }
    },

    por_pagar: {
      type: DataTypes.BIGINT.UNSIGNED,
      defaultValue: 0,
      validate: {
        min: 0,
        isInt: true
      }
    },
    estado_pago_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      defaultValue: 1,
      references: {
        model: 'VentaEstadoPago',
        key: 'id'
      }
    },
    estado_entrega_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      defaultValue: 1,
      references: {
        model: 'VentaEstadoEntrega',
        key: 'id'
      }
    },

    nombre_cliente: {
      type: DataTypes.STRING(100)
    },
    direccion: {
      type: DataTypes.STRING(120)
    }

  }, {
    sequelize,
    modelName: 'Venta',
    tableName: 'Venta',
    timestamps: false,
    hooks: {
      beforeUpdate: async (venta, options) => {
        if (venta.changed('id') || venta.changed('fecha') || venta.changed('hora') || venta.changed('cliente_id')) {
          throw new Error('No se puede modificar el id, fecha, hora o cliente de la venta una vez creada')
        }

        if (venta.changed('pagado') || venta.changed('total')) {
          let total = venta.changed('total') ? venta.total : venta.previous('total')
          let pagado = venta.changed('pagado') ? venta.pagado : venta.previous('pagado')

          total = Number(total)
          pagado = Number(pagado)

          if (pagado < 0 || total < 0) {
            throw new Error('El valor pagado y el total no puede ser menor a 0')
          }
          if (pagado > total) {
            pagado = total
          }
          const porPagar = total - pagado

          venta.pagado = pagado
          venta.por_pagar = porPagar

          const clienteId = venta.get('cliente_id')
          const Cliente = venta.sequelize.models.Cliente
          const cliente = await Cliente.findByPk(clienteId, {
            transaction: options.transaction,
            lock: options.transaction.LOCK.UPDATE
          })

          cliente.debe = Number(cliente.debe) - Number(venta.previous('por_pagar')) + porPagar
          await cliente.save({ transaction: options.transaction })

          if (venta.por_pagar > 0) {
            venta.estado_pago = 1
          } else {
            venta.estado_pago = 2
          }
        }
      },

      beforeCreate: async (venta, options) => {
        const clienteId = Number(venta.cliente_id)

        // Valor por defecto
        if (!clienteId) {
          venta.cliente_id = 1
        }

        if (clienteId < 2 && !venta.nombre_cliente) {
          throw new Error('Nombre de cliente invalido')
        }

        if (clienteId > 1) {
          const Cliente = venta.sequelize.models.Cliente
          const cliente = await Cliente.findOne({
            where: { id: clienteId },
            nombre: ['nombre']
          })

          venta.nombre_cliente = cliente.nombre
        }
      }

    }
  })
  return Venta
}
