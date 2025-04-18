const {Cliente} = require('./models')
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Venta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Venta.belongsTo(models.Cliente, {
        foreignKey: 'cliente_id',
        as: 'clienteVenta'
      })

      Venta.hasMany(models.DetalleVenta, {
        foreignKey: 'venta_id',
        as: 'ventaDetalle'
      })

      Venta.belongsTo(models.VentaEstado, {
        foreignKey: 'estado_id',
        as: 'estadoVenta'
      })

    }
  }
  Venta.init({
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    hora: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    cliente_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'clientes',
        key: 'id'
      }
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Recogido en tienda',
    },
    pagado: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    total: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    estado_pago: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    por_pagar: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
    },

    estado_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: 'ventas_estados',
        key: 'id'
    }},
  }, {
    sequelize,
    modelName: 'Venta',
    tableName: 'ventas',
    timestamps: false,
    hooks: {
      beforeCreate: async (venta, options) => {
        // Crear una instancia de cliente
        const cliente = await Cliente.findByPk(venta.cliente_id, {
          attributes: ['id', 'debe'],
          transaction: options.transaction
        })

        
        // Observar si el cliente genera deuda
        venta.por_pagar = venta.total - venta.pagado;
        if (venta.por_pagar == 0) {
          venta.estado_pago = true;
        }
        else {
          venta.estado_pago = false;
        }

        // Agregar la deuda al cliente
        cliente.debe = cliente.debe + venta.por_pagar;
        await cliente.save({
          transaction: options.transaction
        })

      },
      beforeUpdate: async (venta, options) => {
        // Crear una instancia de cliente
        const cliente = await Cliente.findByPk(venta.cliente_id, {
          attributes: ['id', 'debe'],
          transaction: options.transaction
        })

        
        // Obtener valores para calcular la deuda
        const cambioTotal = venta.changed('total')
        const cambioPagado = venta.changed('pagado')

        let diffTotal = 0
        let diffPagado = 0

        if (cambioTotal) {
          diffTotal = venta.total - venta.previous.total
        }
        if (cambioPagado) {
          diffPagado = venta.pagado - venta.previous.pagado
        }

        const por_pagar = venta.por_pagar + diffTotal - diffPagado

        

        // Observar si el cliente genera deuda
        venta.por_pagar = por_pagar;
        if (venta.por_pagar == 0) {
          venta.estado_pago = true;
        }
        else {
          venta.estado_pago = false;
        }


        // Modifica la deuda del cliente
        cliente.debe = cliente.debe + diffTotal - diffPagado;
        await cliente.save({
          transaction: options.transaction
        })
      }
    }
  });
  return Venta;
};