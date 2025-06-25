const Joi = require('Joi')
const { nombre, constrasenia, email } = require('./propiedades')

// ACCESO \\

const accesoUsuariosSchema = Joi.object({
  usuario: nombre.require(),
  contrasenia: nombre.require()
})

// CREAR \\

const crearUsuarioSchema = Joi.object({
  nombre: nombre.required(),
  constrasenia: constrasenia.required(),
  email
})

module.exports = {
  crearUsuarioSchema,
  accesoUsuariosSchema
}
