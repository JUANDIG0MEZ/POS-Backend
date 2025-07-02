'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Venta extends Model {
    static associate (models) {
      Venta.belongsTo(models.Usuario, {
        foreignKey: 'id_usuario',
        as: 'usuarioVenta'
      })
      Venta.belongsTo(models.Cliente, {
        foreignKey: 'id_cliente',
        as: 'clienteVenta'
      })

      Venta.hasMany(models.DetalleVenta, {
        foreignKey: 'id_venta',
        as: 'ventaDetalle'
      })

      Venta.belongsTo(models.VentaEstadoPago, {
        foreignKey: 'id_estado_pago',
        as: 'estadoPagoVenta'
      })

      Venta.belongsTo(models.VentaEstadoEntrega, {
        foreignKey: 'id_estado_entrega',
        as: 'estadoEntregaVenta'
      })
    }
  }
  Venta.init({
    venta_id: {
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
        model: 'VentaEstadoEntrega',
        key: 'id'
      }
    },
    id_estado_pago: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: 'VentaEstadoPago',
        key: 'id'
      }
    },
    nombre_cliente: {
      type: DataTypes.STRING(100),
      allowNull: false
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
