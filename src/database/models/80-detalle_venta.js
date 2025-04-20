
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetalleVenta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DetalleVenta.belongsTo(models.Venta, {
        foreignKey: 'venta_id',
        as: 'ventaDetalle'
      }),

      DetalleVenta.belongsTo(models.Producto, {
        foreignKey: 'producto_id',
        as: 'productoDetalleVenta'
      })
    }
  }
  DetalleVenta.init({
    venta_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ventas',
        key: 'id'
      }
    },
    producto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'productos',
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
      allowNull: false,
      validate: {
        min: 0
      }
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'DetalleVenta',
    tableName: 'detalles_ventas',
    hooks: {

      beforeUpdate: async (detalle, options) => {
        if (detalle.changed('venta_id') || detalle.changed('producto_id')){
          throw new Error('No se puede modificar el id de la venta o del producto')
        }

        const cantidad = detalle.changed('cantidad') ? detalle.cantidad : detalle.previous('cantidad')
        const precio = detalle.changed('precio') ? detalle.precio : detalle.previous('precio')

        // Crear una instancia de Producto para modificar la cantidad
        const Producto = detalle.sequelize.models.Producto
        const producto = await Producto.findByPk(detalle.producto_id, {
          transaction: options.transaction,
          lock: options.transaction.LOCK.UPDATE        
        })
        // Crear una instancia de Compra para modificar el total
        const Venta = detalle.sequelize.models.Venta
        const venta = await Venta.findByPk(detalle.venta_id, 
          {
            transaction: options.transaction,
            lock: options.transaction.LOCK.UPDATE
          })


        if (detalle.changed('cantidad')){

          const cantatidadAntes = detalle.previous('cantidad')
          const diffCantidad = cantidad - cantatidadAntes

          // Modificar la cantidad del producto
          producto.cantidad = producto.cantidad - diffCantidad
          await producto.save({transaction: options.transaction})
        }

        // Calcular la diferencia de cantidad
        const subtotalAntes = detalle.subtotal
        const subtotalAhora = cantidad * precio

        // Modificar el total de la compra
        detalle.subtotal = subtotalAhora
        venta.total = venta.total - subtotalAntes + subtotalAhora
        await venta.save({transaction: options.transaction})
      },
      
      beforeCreate: async (detalle, options) => {
        // Crear una instancia de Producto y Compra
        const Producto = detalle.sequelize.models.Producto
        const producto = await Producto.findByPk(detalle.producto_id, {
          transaction: options.transaction,
          lock: options.transaction.LOCK.UPDATE
        })

        const Venta = detalle.sequelize.models.Venta
        const venta = await Venta.findByPk(detalle.venta_id, {
          transaction: options.transaction,
          lock: options.transaction.LOCK.UPDATE
        })


        producto.cantidad = producto.cantidad -  detalle.cantidad
        await producto.save({transaction: options.transaction})

        detalle.subtotal = detalle.cantidad * detalle.precio
        venta.total = venta.total + detalle.subtotal
        
        await venta.save({transaction: options.transaction})

      },
    }, 
  });
  return DetalleVenta;
};