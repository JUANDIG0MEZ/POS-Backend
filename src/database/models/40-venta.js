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

      Venta.belongsTo(models.EstadoFactura, {
        foreignKey: 'id_estado_factura',
        as: 'estadoFacturaVenta'
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
      type: DataTypes.DECIMAL(15, 3),
      allowNull: false,
      defaultValue: 0,
      get () {
        return Number(this.getDataValue('pagado'))
      }
    },
    total: {
      type: DataTypes.DECIMAL(15, 3),
      allowNull: false,
      defaultValue: 0,
      get () {
        return Number(this.getDataValue('total'))
      },
      validate: {
        mayorQuePagado (value) {
          if (value < this.pagado) throw new Error('El valor abonado no puede ser mayor al total')
        }
      }
    },
    por_pagar: {
      type: DataTypes.DECIMAL(15, 3),
      allowNull: false,
      defaultValue: 0,
      get () {
        return Number(this.getDataValue('total'))
      }
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
      type: DataTypes.STRING(120),
      allowNull: true
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
    modelName: 'Venta',
    tableName: 'Venta',
    timestamps: false,
    hooks: {
      beforeUpdate: async (venta, options) => {
        if (venta.changed('total')) throw new Error('No esta permitido actualizar el total')
        if (venta.changed('pagado')) {
          const total = venta.total
          const pagado = venta.pagado

          const porPagar = total - pagado

          venta.pagado = pagado
          venta.por_pagar = porPagar

          const idCliente = venta.id_cliente
          const Cliente = venta.sequelize.models.Cliente
          const cliente = await Cliente.findByPk(idCliente, {
            transaction: options.transaction,
            lock: options.transaction.LOCK.UPDATE
          })

          cliente.debe = cliente.debe - venta.previous('por_pagar') + porPagar
          await cliente.save({ transaction: options.transaction })

          if (venta.por_pagar > 0) venta.estado_pago = 1
          else venta.estado_pago = 2
        }
      },

      beforeCreate: async (venta, options) => {
        const clienteId = venta.cliente_id
        if (clienteId < 2 && !venta.nombre_cliente) throw new Error('Nombre de cliente invalido')
      }

    }
  })
  return Venta
}
