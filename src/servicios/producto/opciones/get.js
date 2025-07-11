const {
  ProductoMedida,
  ProductoCategoria
} = require('../../../database/models/index.js')

const { col } = require('sequelize')
class OpcionesGetProducto {
  static atributos () {
    return {
      exclude: ['id', 'id_usuario', 'id_categoria', 'id_medida'],
      include: [
        [col('medidaProducto.nombre'), 'medida'],
        [col('categoriaProducto.nombre'), 'categoria']]
    }
  }

  static incluir () {
    return [
      { model: ProductoMedida, attributes: [], as: 'medidaProducto' },
      { model: ProductoCategoria, attributes: [], as: 'categoriaProducto' }
    ]
  }
}

class OpcionesGetAjustesInventario {
  static atributos () {
    return {
      exclude: ['id', 'id_usuario']
    }
  }
}

class OpcionesGetProductoAjustesInventario {
  static atributos () {
    return {
      exclude: ['id', 'id_usuario', 'id_categoria', 'id_medida', 'precio_compra', 'precio_venta', 'cantidad', 'total'],
      include: [
        [col('medidaProducto.nombre'), 'medida'],
        [col('categoriaProducto.nombre'), 'categoria']]
    }
  }

  static incluir () {
    return [
      { model: ProductoMedida, attributes: [], as: 'medidaProducto' },
      { model: ProductoCategoria, attributes: [], as: 'categoriaProducto' }
    ]
  }
}

module.exports = {
  OpcionesGetProducto,
  OpcionesGetAjustesInventario,
  OpcionesGetProductoAjustesInventario
}
