const Joi = require('joi')
const {
  nombreLargo,
  direccion,
  telefono,
  email,
  id,
  nit,
  limit,
  offset,
  orden
} = require('./propiedades')

// OBTENER \\

const paramsClientesSchema = Joi.object({
  id: id.required()
})

const queryClientesSchema = Joi.object({
  id,
  limit,
  offset,
  id_tipo: Joi.number().integer().min(0),
  columna: Joi.string().valid('id', 'por_pagarle', 'debe'),
  orden
})

const queryClienteSchema = Joi.object({
  limit: limit.required(),
  offset: offset.required()
})

// CREAR \\
const crearClienteSchema = Joi.object({
  nombre: nombreLargo.required(),
  direccion,
  telefono,
  email,
  id_tipo: id.required()
})

const crearEmpresaSchema = Joi.object({
  nombre: nombreLargo.required(),
  direccion,
  telefono,
  nit
})

module.exports = {
  queryClienteSchema,
  queryClientesSchema,
  paramsClientesSchema,
  crearClienteSchema,
  crearEmpresaSchema
}
