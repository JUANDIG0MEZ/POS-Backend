const Joi = require('joi')
const { NUMBER } = require('sequelize')

const nombre = Joi.string().max(50)
const nombreLargo = Joi.string().max(100)
const direccion = Joi.string().max(120)
const email = Joi.string().email().max(50)
const nit = Joi.string().length(9)
const telefono = Joi.string().pattern(/^\d{7}$|^\d{10}$/)
const descripcion = Joi.string().max(255)
const contrasenia = Joi.string().max(255)

const precio = Joi.number().integer().min(0).max(Number.MAX_SAFE_INTEGER).strict()
const cantidad = Joi.number().integer().min(0).max(Number.MAX_SAFE_INTEGER).strict()
const total = Joi.number().integer().min(0).max(Number.MAX_SAFE_INTEGER).strict()
const id = Joi.number().integer().min(1).max(Number.MAX_SAFE_INTEGER).strict()
// QUERYS

// Paginacion
const limit = Joi.number().integer().min(0).max(50)
const offset = Joi.number().integer()

// querys
const enteroQuery = Joi.number().integer().min(0)
const fecha = Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/)
const hora = Joi.string().pattern(/^\d{2}:\d{2}:\d{2}$/)
const orden = Joi.string().valid('ASC', 'DESC')

module.exports = {
  nombre,
  nombreLargo,
  direccion,
  email,
  nit,
  telefono,
  descripcion,
  contrasenia,
  precio,
  cantidad,
  total,
  id,

  limit,
  offset,
  fecha,
  hora,
  orden,
  enteroQuery
}
