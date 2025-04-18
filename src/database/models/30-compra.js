const {Cliente} = require('./index.js')
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
      beforeCreate: async (compra, options) => {
        // Crear una instancia de cliente
        const cliente = await Cliente.findByPk(compra.cliente_id, {
          attributes: ['id', 'por_pagarle'],
          transaction: options.transaction
        })

        
        // Observar si el cliente genera deuda
        compra.por_pagar = compra.total - compra.pagado;
        if (compra.por_pagar == 0) {
          compra.estado_pago = true;
        }
        else {
          compra.estado_pago = false;
        }

        // Agregar la deuda al cliente
        cliente.por_pagarle = cliente.por_pagarle + compra.por_pagar;
        await cliente.save({
          transaction: options.transaction
        })

      },
      beforeUpdate: async (compra, options) => {
        // Crear una instancia de cliente
        const cliente = await Cliente.findByPk(compra.cliente_id, {
          attributes: ['id', 'por_pagarle'],
          transaction: options.transaction
        })

        
        // Obtener valores para calcular la deuda
        const cambioTotal = compra.changed('total')
        const cambioPagado = compra.changed('pagado')

        let diffTotal = 0
        let diffPagado = 0

        if (cambioTotal) {
          diffTotal = compra.total - compra.previous.total
        }
        if (cambioPagado) {
          diffPagado = compra.pagado - compra.previous.pagado
        }

        const por_pagar = compra.por_pagar + diffTotal - diffPagado

        

        // Observar si el cliente genera deuda
        compra.por_pagar = por_pagar;
        if (compra.por_pagar == 0) {
          compra.estado_pago = true;
        }
        else {
          compra.estado_pago = false;
        }


        // Modifica la deuda del cliente
        cliente.por_pagarle = cliente.por_pagarle + diffTotal - diffPagado;
        await cliente.save({
          transaction: options.transaction
        })
      }
    }
  });
  return Compra;
};
