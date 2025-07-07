'use strict'

const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate (models) {
      Usuario.hasMany(models.Producto, {
        foreignKey: 'id_usuario',
        as: 'usuarioProducto'
      })

      Usuario.hasMany(models.Empresa, {
        foreignKey: 'id_usuario',
        as: 'usuarioEmpresa'
      })

      Usuario.hasMany(models.ProductoCategoria, {
        foreignKey: 'id_usuario',
        as: 'usuarioProductoCategoria'
      })

      Usuario.hasMany(models.ProductoImagen, {
        foreignKey: 'id_usuario',
        as: 'usuarioProductoImagen'
      })

      Usuario.hasMany(models.Cliente, {
        foreignKey: 'id_usuario',
        as: 'usuarioCliente'
      })

      Usuario.hasMany(models.Venta, {
        foreignKey: 'id_usuario',
        as: 'usuarioVenta'
      })

      Usuario.hasMany(models.Compra, {
        foreignKey: 'id_usuario',
        as: 'usuarioCompra'
      })

      Usuario.hasMany(models.Pago, {
        foreignKey: 'id_usuario',
        as: 'usuarioPago'
      })

      Usuario.hasMany(models.Abono, {
        foreignKey: 'id_usuario',
        as: 'usuarioAbono'
      })

      Usuario.hasMany(models.AjusteInventario, {
        foreignKey: 'id_usaurio',
        as: 'ajusteUsuario'
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
