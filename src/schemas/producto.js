const Joi = require('joi')
const {
  nombre,
  descripcion,
  id,
  precio,
  cantidad,
  total,
  limit,
  offset
} = require('./propiedades')

// OBTENER

const paramsProductosSchema = Joi.object({
  id: id.required()
})

const queryProductosSchema = Joi.object({
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

const actualizarProductoSchema = Joi.object({
  categoria_id: id,
  precio_compra: precio,
  precio_venta: precio,
  cantidad
})

module.exports = {
  queryProductosSchema,
  paramsProductosSchema,
  crearProductoSchema,
  crearCategoriaSchema,
  actualizarProductoSchema
}
