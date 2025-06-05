const { Model } = require('sequelize')

'use strict'

module.exports = (sequelize, DataTypes) => {
  class Venta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
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
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    hora: {
      type: DataTypes.TIME,
      allowNull: false
    },
    cliente_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Cliente',
        key: 'id'
      }
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Recogido en tienda'
    },
    pagado: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        isInt: true
      }
    },
    total: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        isInt: true
      }
    },

    por_pagar: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      validate: {
        min: 0,
        isInt: true
      }
    },
    estado_pago_id: {
      type: DataTypes.SMALLINT,
      defaultValue: 1,
      references: {
        model: 'VentaEstadoPago',
        key: 'id'
      }
    },
    estado_entrega_id: {
      type: DataTypes.SMALLINT,
      defaultValue: 1,
      references: {
        model: 'VentaEstadoEntrega',
        key: 'id'
      }
    },

    nombre_cliente: {
      type: DataTypes.STRING
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
          const por_pagar = total - pagado

          venta.pagado = pagado
          venta.por_pagar = por_pagar

          const clienteId = venta.get('cliente_id')
          const Cliente = venta.sequelize.models.Cliente
          const cliente = await Cliente.findByPk(clienteId, {
            transaction: options.transaction,
            lock: options.transaction.LOCK.UPDATE
          })

          cliente.debe = Number(cliente.debe) - Number(venta.previous('por_pagar')) + por_pagar
          await cliente.save({ transaction: options.transaction })

          if (venta.por_pagar > 0) {
            venta.estado_pago = 1
          } else {
            venta.estado_pago = 2
          }
        }
      },

      beforeCreate: async (venta, options) => {
        const cliente_id = Number(venta.cliente_id)

        // Valor por defecto
        if (!cliente_id) {
          venta.cliente_id = 1
        }

        if (cliente_id < 2 && !venta.nombre_cliente) {
          throw new Error('Nombre de cliente invalido')
        }

        if (cliente_id > 1) {
          const Cliente = venta.sequelize.models.Cliente
          const cliente = await Cliente.findOne({
            where: { id: cliente_id },
            nombre: ['nombre']
          })

          venta.nombre_cliente = cliente.nombre
        }
      }

    }
  })
  return Venta
}
