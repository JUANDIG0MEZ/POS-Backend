const Joi = require('joi')
const {
  id,
  cantidad,
  precio,
  total,
  nombreLargo,
  limit,
  offset,
  fecha,
  orden,
  nombre,
  descripcion,
  enteroQuery
} = require('./propiedades')

// OBTENER \\

const paramsComprasSchema = Joi.object({
  id: id.required()
})

const queryComprasSchema = Joi.object({
  compra_id: enteroQuery,
  cliente_id: enteroQuery,
  estado_entrega_id: enteroQuery,
  estado_pago_id: enteroQuery,
  fechaInicio: fecha,
  fechaFinal: fecha,
  columna: Joi.string().valid('compra_id', 'por_pagar'),
  orden,
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
  info: Joi.object({
    cliente_id: id.required(),
    pagado: total.required(),
    total: total.required(),
    id_estado_entrega: id.required(),
    id_metodo_pago: id.required(),
    descripcion: nombreLargo.strict(),
    nombre_cliente: nombreLargo.strict()
  }),
  productos: Joi.array().items(detalle)
})

module.exports = {
  paramsComprasSchema,
  queryComprasSchema,
  crearCompraSchema

}
