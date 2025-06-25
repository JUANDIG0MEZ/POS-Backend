const Joi = require('joi')
const {
  id,
  cantidad,
  precio,
  total,
  nombreLargo,
  limit,
  offset
} = require('./propiedades')

// OBTENER \\

const paramsComprasSchema = Joi.object({
  id: id.required()
})

const queryComprasSchema = Joi.object({
  limit,
  offset
})

// CREAR \\

const detalle = Joi.object({
  producto_id: id.required(),
  cantidad: cantidad.required(),
  precio: precio.required()
})

const crearCompraSchema = Joi.object({
  cliente_id: id.required(),
  pagado: total.required(),
  total: total.required(),
  estado_entrega_id: id.required(),
  nombre_cliente: nombreLargo.required(),
  productos: Joi.array(detalle)
})

module.exports = {
  paramsComprasSchema,
  queryComprasSchema,
  crearCompraSchema

}
