const { Model } = require('sequelize');

'use strict';

module.exports = (sequelize, DataTypes) => {
  class DetalleCompra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DetalleCompra.belongsTo(models.Compra, {
        foreignKey: 'compra_id',
        as: 'compraDetalle'

      })

      DetalleCompra.belongsTo(models.Producto, {
        foreignKey: 'producto_id',
        as: 'productoDetalleCompra'
      })
    }
  }
  DetalleCompra.init({
    compra_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Compra',
        key: 'id'
      }
    },
    producto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Producto',
        key: 'id'
      }
    },
    cantidad: {
      type: DataTypes.DECIMAL(10, 0),
      allowNull: false,
      validate: {
        min: 0
      }
    },
    precio: {
      type: DataTypes.DECIMAL(10, 0),
      allowNull: false,
      validate: {
        min: 0
      }
    },
    subtotal: {
      type: DataTypes.DECIMAL(12, 0),
      allowNull: true,
      validate: {
        min: 0
      }
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'DetalleCompra',
    tableName: 'DetalleCompra',
    hooks: {
      beforeUpdate: async (detalle, options) => {
        // Validar que no se modifiquen columnas que no se deben modificar
        if (detalle.changed('compra_id') || detalle.changed('producto_id')){
          throw new Error('No se puede modificar el id de la compra o del producto')
        }

        // Modificar la factura de compra 

        // Crear una instancia de Compra para modificar el total
        const Compra = detalle.sequelize.models.Compra
        const compra = await Compra.findByPk(detalle.compra_id, {
          transaction: options.transaction,
          lock: options.transaction.LOCK.UPDATE
        })

        // Calcular la diferencia de cantidad
        const subtotalAntes = parseInt(detalle.subtotal)
        const subtotalAhora = parseInt(detalle.cantidad) * parseInt(detalle.precio)


        detalle.subtotal = subtotalAhora
        // Modificar el total de la compra
        compra.total = compra.total - subtotalAntes + subtotalAhora
        
        await compra.save({transaction: options.transaction})


        // Modificar el stock del producto si la cantidad ha cambiado

        const Producto = detalle.sequelize.models.Producto
        const producto = await Producto.findByPk(detalle.producto_id, 
          {
            transaction: options.transaction,
            lock: options.transaction.LOCK.UPDATE
          })


        // Logica

        if (detalle.changed('cantidad')){
          producto.cantidad = producto.cantidad - parseInt(detalle.previous('cantidad')) + parseInt(detalle.cantidad)
          await producto.save({transaction: options.transaction})
        }

      },

      beforeCreate: async (detalle, options) => {

        // Crear una instancia de Producto y Compra
        const Producto = detalle.sequelize.models.Producto

        const producto = await Producto.findByPk(detalle.producto_id, {
          transaction: options.transaction,
          lock: options.transaction.LOCK.UPDATE
        })

        const Compra = detalle.sequelize.models.Compra
        const compra = await Compra.findByPk(detalle.compra_id, {
          transaction: options.transaction,
          lock: options.transaction.LOCK.UPDATE
        })


        producto.cantidad = producto.cantidad +  parseInt(detalle.cantidad)

        await producto.save({transaction: options.transaction})


        detalle.subtotal = detalle.cantidad * detalle.precio
        compra.total = compra.total + parseInt(detalle.subtotal)

        await compra.save({transaction: options.transaction})
      },
    

    }, 
  });
  return DetalleCompra;
};