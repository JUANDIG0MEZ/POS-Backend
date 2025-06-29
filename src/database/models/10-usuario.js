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

    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    contrasenia: {
      allowNull: false,
      type: DataTypes.STRING(250)

    },

    verificado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    codigoVerificacion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    expiracionCodigo: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: () => new Date(Date.now() + 5 * 60 * 1000)
    },
    fechaCreado: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: () => new Date().toISOString().split('T')[0]
    }

  }, {
    sequelize,
    modelName: 'Usuario',
    timestamps: false,
    tableName: 'Usuario',
    hooks: {
      afterCreate: async (usuario, options) => {
        // Se inicializa la secuencia para el usuario recién creado
        await usuario.sequelize.models.Secuencia.create({ id: usuario.id }, options)
      }
    }
  })
  return Usuario
}
