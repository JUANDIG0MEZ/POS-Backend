const Joi = require('joi')
const { contrasenia, email } = require('../propiedades')

const registerUserSchema = Joi.object({
  email: email.required()
})

const confirmUserSchema = Joi.object({
  contrasenia: contrasenia.required()
})

const loginUserSchema = Joi.object({
  email: email.required(),
  contrasenia: contrasenia.required()
})

module.exports = {
  registerUserSchema,
  confirmUserSchema,
  loginUserSchema
}
