const Joi = require('Joi')
const { nombre, constrasenia, email, limit, offset, id } = require('./propiedades')

// OBTENER \\

const queryUsuariosSchema = Joi.object({
  limit,
  offset
})

const paramsUsuariosSchema = Joi.object({
  id: id.require()
})

// CREAR \\

const crearUsuarioSchema = Joi.object({
  nombre: nombre.required(),
  constrasenia: constrasenia.required(),
  email
})

module.exports = {
  crearUsuarioSchema,
  queryUsuariosSchema,
  paramsUsuariosSchema
}
