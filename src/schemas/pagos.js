const Joi = require('joi')

const {
  limit,
  offset,
  id,
  total,
  descripcion
} = require('./propiedades')

// OBTENER \\

const paramsPagosSchema = Joi.object({
  id: id.required()
})

const queryPagosSchema = Joi.object({
  limit,
  offset
})

// CREAR \\\

const crearPagoClienteSchema = Joi.object({
  cliente_id: id.required(),
  valor: total.required(),
  metodo_pago_id: id.required(),
  descripcion
})

const crearPagoCompraSchema = Joi.object({
  compra_id: id.required(),
  valor: total.required(),
  metodo_pago_id: id.required(),
  descripcion
})

module.exports = {
  paramsPagosSchema,
  queryPagosSchema,
  crearPagoClienteSchema,
  crearPagoCompraSchema
}
