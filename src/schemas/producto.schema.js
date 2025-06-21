const Joi = require('joi')

const string = Joi.string().min(3).max(255)
const entero = Joi.number().integer().positive()
const precio = Joi.number().positive()

const crearProductoSchema = Joi.object({
  nombre: string.required(),

  // precio_compra: precio.required(),
  precio_compra: precio.required(),
  precio_venta: precio.required(),

  medida: string,
  medida_id: entero,

  categoria: string,
  categoria_id: entero,

  marca: string,
  marca_id: entero,

  cantidad: entero
})

const actualizarProductoSchema = Joi.object({
  categoria: string,
  categoria_id: entero,
  precio_compra: precio,
  precio_venta: precio
})

module.exports = {
  crearProductoSchema,
  actualizarProductoSchema
}
