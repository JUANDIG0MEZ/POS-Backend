const Joi = require('joi')

const {
  id,
  total,
  nombreLargo,
  cantidad,
  precio,
  offset,
  limit
} = require('./propiedades.js')

// OBTENER

const queryVentasSchema = Joi.object({
  offset,
  limit
})

const paramsVentasSchema = Joi.object({
  id: id.required()
})

// CREAR

const detalle = Joi.object({
  producto_id: id.required(),
  cantidad: cantidad.required(),
  precio: precio.required()
})

const crearVentaSchema = Joi.object({
  cliente_id: id.required(),
  pagado: total.required(),
  total: total.required(),
  estado_entrega_id: id.required(),
  nombre_cliente: nombreLargo.required(),
  productos: Joi.array(detalle)
})

module.exports = {
  paramsVentasSchema,
  queryVentasSchema,
  crearVentaSchema
}
