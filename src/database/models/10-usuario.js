'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate (models) {
      Usuario.hasMany(models.Producto, {
        foreignKey: 'usuario_id',
        as: 'usuarioProducto'
      })

      Usuario.hasMany(models.Empresa, {
        foreignKey: 'usuario_id',
        as: 'usuarioEmpresa'
      })

      Usuario.hasMany(models.ProductoCategoria, {
        foreignKey: 'usuario_id',
        as: 'usuarioProductoCategoria'
      })

      Usuario.hasMany(models.ProductoImagen, {
        foreignKey: 'usuario_id',
        as: 'usuarioProductoImagen'
      })

      Usuario.hasMany(models.Cliente, {
        foreignKey: 'usuario_id',
        as: 'usuarioCliente'
      })

      Usuario.hasMany(models.Venta, {
        foreignKey: 'usuario_id',
        as: 'usuarioVenta'
      })

      Usuario.hasMany(models.Compra, {
        foreignKey: 'usuario_id',
        as: 'usuarioCompra'
      })

      Usuario.hasMany(models.Pago, {
        foreignKey: 'usuario_id',
        as: 'usuarioPago'
      })

      Usuario.hasMany(models.Abono, {
        foreignKey: 'usuario_id',
        as: 'usuarioAbono'
      })

      Usuario.hasMany(models.DetalleCompra, {
        foreignKey: 'usuario_id',
        as: 'usuarioDetalleCompra'
      })

      Usuario.hasMany(models.DetalleVenta, {
        foreignKey: 'usuario_id',
        as: 'usuarioDetalleVenta'
      })
    }
  }
  Usuario.init({

    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    contrasenia: {
      allowNull: false,
      type: DataTypes.STRING(250)

    },
    createdAt: {
      type: DataTypes.DATEONLY,
      allowNull: false

    }

  }, {
    sequelize,
    modelName: 'Usuario',
    timestamps: false,
    tableName: 'Usuario'
  })
  return Usuario
}
