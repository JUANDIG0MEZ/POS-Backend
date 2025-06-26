const Joi = require('joi')
const { nombre, contrasenia, email } = require('./propiedades')

// ACCESO \\

const accesoUsuariosSchema = Joi.object({
  email: email.required(),
  contrasenia: nombre.required()
})

// CREAR \\

const verificarUsuarioSchema = Joi.object({
  email: email.required(),
  codigoVerificacion: Joi.string().length(6)
})

const crearUsuarioSchema = Joi.object({
  email: email.required(),
  contrasenia: contrasenia.required()

})

module.exports = {
  crearUsuarioSchema,
  verificarUsuarioSchema,
  accesoUsuariosSchema
}
