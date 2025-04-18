const { Producto, Venta} = require('./index.js')
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
        min: 1
      }
    },
    precio: {
      type: DataTypes.DECIMAL(10, 0),
      allowNull: false,
      validate: {
        min: 1
      }
    },
    subtotal: {
      type: DataTypes.DECIMAL(12, 0),
      allowNull: false,
      validate: {
        min: 1
      }
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'DetalleVenta',
    tableName: 'detalles_ventas',
    hooks: {
      beforeUpdate: async (detalle, options) => {
        // Crear una instancia de Producto para modificar la cantidad
        const producto = await Producto.findByPk(detalle.producto_id, {
          attributes: ['id', 'cantidad'],
          transaction: options.transaction
        })
        // Crear una instancia de Venta para modificar el total
        const venta = await Venta.findByPk(detalle.venda_id, {
          attributes: ['id', 'total'],
          transaction: options.transaction
        })

        // Calcular la diferencia de cantidad
        const cantatidadAntes = detalle.previous('cantidad')
        const cantidadAhora = detalle.cantidad
        const diffCantidad = cantidadAhora - cantatidadAntes

        // calcular la diferencia de subtotal
        const precioAhora = detalle.precio
        const subTotalAntes = detalle.previous('subtotal')
        const subTotalAhora =  cantidadAhora * precioAhora
        const diffTotal = subTotalAhora - subTotalAntes

        // Modificar la cantidad del producto
        producto.cantidad = producto.cantidad - diffCantidad
        await producto.save({transaction: options.transaction})

        // Modificar el total de la compra
        venta.total = venta.total - diffTotal
        await venta.save({transaction: options.transaction})
      },

      
      beforeCreate: async (detalle, options) => {

        // Crear una instancia de Producto y Venta
        const producto = await Producto.findByPk(detalle.producto_id, {
          attributes: ['id', 'cantidad'],
          transaction: options.transaction
        })

        const venta = await Venta.findByPk(detalle.venta_id, {
          attributes: ['id', 'total'],
          transaction: options.transaction
        })

        producto.cantidad = producto.cantidad - detalle.cantidad
        await producto.save({transaction: options.transaction})


        detalle.subtotal = detalle.cantidad * detalle.precio
        venta.total = venta.total + detalle.subtotal
        await venta.save({transaction: options.transaction})
      },
    

    }, 
  });
  return DetalleVenta;
};