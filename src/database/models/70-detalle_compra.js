import { Compra, Producto} from 'index.js'

'use strict';
const {
  Model
} = require('sequelize');

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
        model: 'compras',
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
    modelName: 'DetalleCompra',
    tableName: 'detalles_compras',
    hooks: {
      beforeUpdate: async (detalle, options) => {
        // Crear una instancia de Producto para modificar la cantidad
        const producto = await Producto.findByPk(detalle.producto_id, {
          attributes: ['id', 'cantidad'],
          transaction: options.transaction
        })
        // Crear una instancia de Compra para modificar el total
        const compra = await Compra.findByPk(detalle.compra_id, {
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
        producto.cantidad = producto.cantidad + diffCantidad
        await producto.save({transaction: options.transaction})

        // Modificar el total de la compra
        compra.total = compra.total - diffTotal
        await compra.save({transaction: options.transaction})
      },

      beforeCreate: async (detalle, options) => {

        // Crear una instancia de Producto y Compra
        const producto = await Producto.findByPk(detalle.producto_id, {
          attributes: ['id', 'cantidad'],
          transaction: options.transaction
        })

        const compra = await Compra.findByPk(detalle.compra_id, {
          attributes: ['id', 'total'],
          transaction: options.transaction
        })

        producto.cantidad = producto.cantidad - detalle.cantidad
        await producto.save({transaction: options.transaction})


        detalle.subtotal = detalle.cantidad * detalle.precio
        compra.total = compra.total + detalle.subtotal
        await compra.save({transaction: options.transaction})
      },
    

    }, 
  });
  return DetalleCompra;
};