const Joi = require('joi')
const {
  nombreLargo,
  direccion,
  telefono,
  email,
  id,
  nit,
  limit,
  offset
} = require('./propiedades')

// OBTENER \\

const paramsClientesSchema = Joi.object({
  id: id.required()
})

const queryClientesSchema = Joi.object({
  limit,
  offset
})

// CREAR \\
const crearClienteSchema = Joi.object({
  nombre: nombreLargo.required(),
  direccion,
  telefono,
  email,
  tipo_id: id.required()
})

const crearEmpresaSchema = Joi.object({
  nombre: nombreLargo.required(),
  direccion,
  telefono,
  nit
})

module.exports = {
  queryClientesSchema,
  paramsClientesSchema,
  crearClienteSchema,
  crearEmpresaSchema
}
