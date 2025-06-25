const Joi = require('joi')

const {
  limit,
  offset,
  id,
  total,
  descripcion
} = require('./propiedades')

// OBTENER \\

const paramsAbonosSchema = Joi.object({
  id: id.required()
})

const queryAbonosSchema = Joi.object({
  limit,
  offset
})

// CREAR \\

const crearAbonoClienteSchema = Joi.object({
  cliente_id: id.required(),
  valor: total.required(),
  metodo_pago_id: id.required(),
  descripcion
})

const crearAbonoVentaSchema = Joi.object({
  venta_id: id.required(),
  valor: total.required(),
  metodo_pago_id: id.required(),
  descripcion
})

module.exports = {
  paramsAbonosSchema,
  queryAbonosSchema,
  crearAbonoClienteSchema,
  crearAbonoVentaSchema
}
