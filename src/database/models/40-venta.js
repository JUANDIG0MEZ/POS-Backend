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
      defaultValue: 0,
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
      beforeUpdate: async (venta, options) => {
        if (venta.changed('id') || venta.changed('fecha') || venta.changed('hora') || venta.changed('cliente_id')) {
          throw new Error('No se puede modificar el id, fecha, hora o cliente de la venta una vez creada');
        }

        if (venta.changed('pagado') || venta.changed('total')) {
          
          const total = venta.changed('total') ? venta.total : venta.previous('total');
          let pagado = venta.changed('pagado') ? venta.pagado : venta.previous('pagado');

          if (pagado < 0 || total < 0) {
            throw new Error('El valor pagado y el total no puede ser menor a 0');
          }
          if (pagado > total) {
            pagado = total;
          }

          venta.pagado = pagado;
          venta.por_pagar = total - pagado;

          const clienteId = venta.get('cliente_id');
          const Cliente = venta.sequelize.models.Cliente;
          const cliente = await Cliente.findByPk(clienteId, {
            transaction: options.transaction,
            lock: options.transaction.LOCK.UPDATE
          });

          
          cliente.debe = cliente.debe - venta.previous('por_pagar') + venta.por_pagar;
          await cliente.save({transaction: options.transaction});


          if (venta.por_pagar == 0) {
            venta.estado_pago = true;
          } else {
            venta.estado_pago = false;
          }

        }
      }
    
    },
  });
  return Venta;
};