const Joi = require('joi')

const MAX_SAFE = Number.MAX_SAFE_INTEGER / 1000 - 1

const nombre = Joi.string().max(50)
const nombreLargo = Joi.string().max(100)
const direccion = Joi.string().max(120)
const email = Joi.string().email().max(50)
const nit = Joi.string().length(9)
const telefono = Joi.string().pattern(/^\d{7}$|^\d{10}$/)
const descripcion = Joi.string().max(255)
const contrasenia = Joi.string().max(255)
const decimalString = Joi.string()
  .pattern(/^$|^-?\d+(\.\d{1,3})?$/)
  .custom((value, helpers) => {
    const Decimal = require('decimal.js')

    try {
      const num = new Decimal(value)
      const min = new Decimal(0)
      const max = new Decimal('999999999999.999')
      if (num.lt(min) || num.gt(max)) {
        return helpers.message('El valor debe estar entre 0 y 999999999.999')
      }
    } catch (err) {
      return helpers.message('No es un número decimal válido')
    }

    return value
  })

const booleano = Joi.boolean().strict()
const precio = decimalString.strict()
const cantidad = decimalString.strict()
const total = decimalString.strict()
const id = Joi.number().integer().min(1).max(Number.MAX_SAFE_INTEGER).strict()
// QUERYS

// Paginacion
const limit = Joi.number().integer().min(0).max(50)
const offset = Joi.number().integer().min(0)

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
  booleano,
  limit,
  offset,
  fecha,
  hora,
  orden,
  enteroQuery
}
