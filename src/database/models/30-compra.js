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
      Compra.belongsTo(models.Cliente, {
        foreignKey: 'cliente_id',
        as: 'clienteCompra'
      })

      Compra.hasMany(models.DetalleCompra, {
        foreignKey: 'compra_id',
        as: 'compraDetalle'
      })
      Compra.belongsTo(models.CompraEstadoEntrega,
        {
          foreignKey: 'estado_entrega_id',
          as: 'estadoEntregaCompra'
        }
      )

      Compra.belongsTo(models.CompraEstadoPago, {
        foreignKey: 'estado_pago_id',
        as: 'estadoPagoCompra'
      })
    }
  }
  Compra.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
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
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Cliente',
        key: 'id'
      }
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
    por_pagar: {
      type: DataTypes.BIGINT,
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
    estado_entrega_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: 'CompraEstadoEntrega',
        key: 'id'
      }
    },

    estado_pago_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: 'CompraEstadoPago',
        key: 'id'
      }
    },
    nombre_cliente: {
      type: DataTypes.STRING
    }

  }, {
    sequelize,
    modelName: 'Compra',
    tableName: 'Compra',
    timestamps: false,
    hooks: {
      beforeUpdate: async (compra, options) => {
        if (compra.changed('id') || compra.changed('fecha') || compra.changed('hora') || compra.changed('cliente_id')) {
          throw new Error('No se puede modificar el id, fecha, hora o cliente de la compra una vez creada')
        }

        if (compra.changed('pagado') || compra.changed('total')) {
          let pagado = compra.changed('pagado') ? Number(compra.pagado) : Number(compra.previous('pagado'))
          const total = compra.changed('total') ? Number(compra.total) : Number(compra.previous('total'))

          if (pagado < 0 || total < 0) {
            throw new Error('El valor pagado y el total no puede ser menor a 0')
          }
          if (pagado > total) {
            pagado = total
          }

          const porPagar = total - pagado
          compra.pagado = pagado
          compra.por_pagar = porPagar

          const clienteId = compra.get('cliente_id')
          const Cliente = compra.sequelize.models.Cliente
          const cliente = await Cliente.findByPk(clienteId, {
            transaction: options.transaction,
            lock: options.transaction.LOCK.UPDATE
          })
          cliente.por_pagarle = Number(cliente.por_pagarle) - Number(compra.previous('por_pagar')) + porPagar
          await cliente.save({ transaction: options.transaction })

          if (compra.por_pagar > 0) {
            compra.estado_pago_id = 1
          } else {
            compra.estado_pago_id = 2
          }
        }
      },

      beforeCreate: async (compra, options) => {
        const clienteId = Number(compra.cliente_id)
        const estadoEntregaId = Number(compra.estado_entrega_id)
        console.log(compra.estado_pago_id)

        if (estadoEntregaId === 0) {
          throw new Error('No se ha establecido el estado de la entrega')
        }

        // Valor por defecto
        if (!clienteId) {
          compra.cliente_id = 1
        }

        if (clienteId < 2 && !compra.nombre_cliente) {
          throw new Error('Nombre de cliente invalido')
        }

        if (clienteId > 1) {
          const Cliente = compra.sequelize.models.Cliente
          const cliente = await Cliente.findOne({
            where: { id: clienteId },
            nombre: ['nombre']
          })

          compra.nombre_cliente = cliente.nombre
        }
      }
    }
  })
  return Compra
}
