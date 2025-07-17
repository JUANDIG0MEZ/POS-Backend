const Joi = require('joi')
const {
  nombre,
  descripcion,
  id,
  precio,
  cantidad,
  total,
  limit,
  offset,
  booleano
} = require('../propiedades')

// OBTENER

const paramsProductosSchema = Joi.object({
  id: id.required()
})

const queryProductosSchema = Joi.object({
  limit,
  offset
})

const queryAjusteSchema = Joi.object({
  limit,
  offset
})

// CREAR

const crearCategoriaSchema = Joi.object({
  nombre: nombre.required(),
  descripcion
})

const crearProductoSchema = Joi.object({
  nombre: nombre.required(),
  categoria_id: id,
  id_medida: id.required(),
  precio_compra: precio.required(),
  precio_venta: precio.required(),
  cantidad: cantidad.required()
})

const detalleAjuste = Joi.object({
  producto_id: id.required(),
  cantidad: cantidad.required()
})

const crearAjusteInventarioSchema = Joi.object({
  detalles: Joi.array().items(detalleAjuste).unique('producto_id').required()
})

// ACTUALIZAR
const actualizarProductoSchema = Joi.object({
  categoria_id: id,
  precio_compra: precio,
  precio_venta: precio
})

module.exports = {
  queryProductosSchema,
  queryAjusteSchema,
  paramsProductosSchema,
  crearProductoSchema,
  crearCategoriaSchema,
  crearAjusteInventarioSchema,
  actualizarProductoSchema
}
