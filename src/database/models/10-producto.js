'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Producto.belongsTo(models.ProductoCategoria, {
        foreignKey: 'categoria_id',
        as: 'categoria'
      })

      Producto.belongsTo(models.ProductoMarca,{
        foreignKey: 'marca_id',
        as: 'marca'
      })
      Producto.belongsTo(models.ProductoMedida,{
        foreignKey: 'medida_id',
        as: 'medida'
      })

      Producto.hasMany(models.DetalleCompra, {
        foreignKey: 'producto_id'
      })
    }
  }
  Producto.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      set(value) {
        this.setDataValue('nombre', value.toLowerCase().trim());
      },
      get() {
        const nombre = this.getDataValue('nombre');
        return nombre ? nombre.replace(/\b\w/g, (char) => char.toUpperCase()) : '';
      }
    },
    marca_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'productos_marcas',
        key: 'id',
      }
    },
    categoria_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'productos_categorias',
        key: 'id',
      }
    },
    medida_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'productos_medidas',
        key: 'id',
      }
    },
    precio_compra: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    precio_venta: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    total: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        min: 0,
      },
    }
  }, {
    sequelize,
    modelName: 'Producto',
    timestamps: false,
    tableName: 'productos'
  });
  return Producto;
};