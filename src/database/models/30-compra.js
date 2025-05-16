

'use strict';
const {
  Model
  
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Compra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Compra.belongsTo(models.Cliente, {
        foreignKey: "cliente_id",
        as: 'clienteCompra'
      })

      Compra.hasMany(models.DetalleCompra, {
        foreignKey: 'compra_id',
        as: 'compraDetalle'
      })
      Compra.belongsTo(models.CompraEstado,
        {
          foreignKey: 'estado_id',
          as: 'estadoCompra'
        }
      )
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
        model: 'clientes',
        key: 'id'
      }
    },
    pagado: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    estado_pago: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    por_pagar: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
    },
    total: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    estado_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: 'compras_estados',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'Compra',
    tableName: 'compras',
    timestamps: false,
    hooks: {
      beforeUpdate: async (compra, options) => {
        if (compra.changed('id') || compra.changed('fecha') || compra.changed('hora') || compra.changed('cliente_id')) {
          throw new Error('No se puede modificar el id, fecha, hora o cliente de la compra una vez creada');
        }

        if (compra.changed('pagado') || compra.changed('total')) {
          
          const total = compra.changed('total') ? compra.total : compra.previous('total');
          let pagado = compra.changed('pagado') ? compra.pagado : compra.previous('pagado');

          if (pagado < 0 || total < 0) {
            throw new Error('El valor pagado y el total no puede ser menor a 0');
          }
          if (pagado > total) {
            pagado = total;
          }
          compra.pagado = pagado
          compra.por_pagar = total - pagado


          const clienteId = compra.get('cliente_id');
          const Cliente = compra.sequelize.models.Cliente;
          const cliente = await Cliente.findByPk(clienteId,{
              transaction: options.transaction,
              lock: options.transaction.LOCK.UPDATE
            });


          cliente.por_pagarle = cliente.por_pagarle - compra.previous('por_pagar') + compra.por_pagar;
          await cliente.save({transaction: options.transaction});
          

          if (compra.por_pagar == 0) {
            compra.estado_pago = true;
          } else {
            compra.estado_pago = false;
          }

        }
      }
    },
  });
  return Compra;
};
