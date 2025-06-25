const Joi = require('joi')

const nombre = Joi.string().max(50)
const nombreLargo = Joi.string().max(100)
const direccion = Joi.string().max(120)
const email = Joi.string().email().max(50)
const nit = Joi.string().length(9)
const telefono = Joi.string().pattern(/^\d{7}$|^\d{10}$/)
const descripcion = Joi.string().max(255)
const constrasenia = Joi.string().max(255)

const precio = Joi.number().integer().min(0).strict()
const cantidad = Joi.number().integer().strict()
const total = Joi.number().integer().min(0).strict()
const id = Joi.number().integer().min(0).strict()

// Paginacion
const limit = Joi.number().integer().strict().min(0).max(50).required()
const offset = Joi.number().integer().strict().required()

module.exports = {
  nombre,
  nombreLargo,
  direccion,
  email,
  nit,
  telefono,
  descripcion,
  constrasenia,
  precio,
  cantidad,
  total,
  id,
  limit,
  offset
}
