const Joi = require('joi')

const {
  id,
  total,
  nombreLargo,
  cantidad,
  precio,
  offset,
  limit,
  enteroQuery,
  fecha,
  orden,
  direccion
} = require('./propiedades.js')

// OBTENER

const paramsVentasSchema = Joi.object({
  id: id.required()
})

const queryVentasSchema = Joi.object({
  venta_id: enteroQuery,
  cliente_id: enteroQuery,
  id_estado_entrega: enteroQuery,
  id_estado_pago: enteroQuery,
  fechaInicio: fecha,
  fechaFinal: fecha,
  columna: Joi.string().valid('venta_id', 'por_pagar'),
  orden,
  limit,
  offset
})

// CREAR

const detalle = Joi.object({
  producto_id: id.required(),
  cantidad: cantidad.required(),
  precio: precio.required()
})

const crearVentaSchema = Joi.object({
  info: Joi.object({
    cliente_id: id.required(),
    pagado: total.required(),
    total: total.required(),
    id_estado_entrega: id.required(),
    id_metodo_pago: id.required(),
    descripcion: nombreLargo.strict(),
    nombre_cliente: nombreLargo.strict(),
    direccion
  }),
  detalles: Joi.array().items(detalle).required()
})

// MODIFICAR

const modificarDetallesVentaSchema = Joi.object({
  detalles: Joi.array().items(detalle)
})

module.exports = {
  paramsVentasSchema,
  queryVentasSchema,
  crearVentaSchema,
  modificarDetallesVentaSchema
}
