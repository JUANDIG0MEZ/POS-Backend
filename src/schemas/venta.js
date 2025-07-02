const Joi = require('joi')

const {
  id,
  total,
  nombreLargo,
  cantidad,
  precio,
  offset,
  limit,
  enteroQuery,
  fecha,
  orden
} = require('./propiedades.js')

// OBTENER

const paramsVentasSchema = Joi.object({
  id: id.required()
})

const queryVentasSchema = Joi.object({
  venta_id: enteroQuery,
  cliente_id: enteroQuery,
  estado_entrega_id: enteroQuery,
  estado_pago_id: enteroQuery,
  fechaInicio: fecha,
  fechaFinal: fecha,
  columna: Joi.string().valid('venta_id', 'por_pagar'),
  orden,
  limit,
  offset
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
  productos: Joi.array().items(detalle)
})

module.exports = {
  paramsVentasSchema,
  queryVentasSchema,
  crearVentaSchema
}
