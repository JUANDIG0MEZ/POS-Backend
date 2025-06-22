'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class DetalleCompra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      DetalleCompra.belongsTo(models.Usuario, {
        foreignKey: 'usuario_id',
        as: 'usuarioDetalleCompra'
      })
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
    cliente_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      references: {
        model: 'Usuario',
        key: 'id'
      }
    },
    compra_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Compra',
        key: 'id'
      }
    },
    producto_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Producto',
        key: 'id'
      }
    },
    cantidad: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    precio: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    subtotal: {
      type: DataTypes.BIGINT.UNSIGNED,
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
        if (detalle.changed('compra_id') || detalle.changed('producto_id')) {
          throw new Error('No se puede modificar el id de la compra o del producto')
        }

        const cantidadAntes = detalle.changed('cantidad') ? Number(detalle.previous('cantidad')) : Number(detalle.cantidad)
        const cantidadAhora = Number(detalle.cantidad)
        const precioAhora = Number(detalle.precio)
        const subtotalAntes = detalle.changed('subtotal') ? Number(detalle.previous('subtotal')) : Number(detalle.subtotal)
        const subtotalAhora = cantidadAhora * precioAhora

        // Se actualiza el subtotal
        detalle.subtotal = subtotalAhora

        // Crear una instancia de Compra para modificar el total
        const Compra = detalle.sequelize.models.Compra
        const compra = await Compra.findByPk(detalle.compra_id, {
          transaction: options.transaction,
          lock: options.transaction.LOCK.UPDATE
        })

        // Modificar el total de la compra
        compra.total = Number(compra.total) - subtotalAntes + subtotalAhora

        await compra.save({ transaction: options.transaction })

        // Modificar el stock del producto si la cantidad ha cambiado

        const Producto = detalle.sequelize.models.Producto
        const producto = await Producto.findByPk(detalle.producto_id,
          {
            transaction: options.transaction,
            lock: options.transaction.LOCK.UPDATE
          })

        if (detalle.changed('cantidad')) {
          producto.cantidad = Number(producto.cantidad) - cantidadAntes + cantidadAhora
          await producto.save({ transaction: options.transaction })
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

        const cantidadDetalle = Number(detalle.cantidad)
        const cantidadProducto = Number(producto.cantidad)
        const precioDetalle = Number(detalle.precio)

        producto.cantidad = cantidadProducto + cantidadDetalle

        await producto.save({ transaction: options.transaction })

        detalle.subtotal = cantidadDetalle * precioDetalle
        compra.total = Number(compra.total) + detalle.subtotal

        await compra.save({ transaction: options.transaction })
      }

    }
  })
  return DetalleCompra
}
