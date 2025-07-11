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
  id_estado_entrega: enteroQuery,
  id_estado_pago: enteroQuery,
  fechaInicio: fecha,
  fechaFinal: fecha,
  columna: Joi.string().valid('compra_id', 'por_pagar'),
  orden,
  limit,
  offset
})

// CREAR \\

const detalles = Joi.object({
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
  detalles: Joi.array().items(detalles).unique('producto_id').required()
})

// MODIFICAR \\

const modificarDetallesSchema = Joi.object({
  detalles: Joi.array().items(detalles).unique('producto_id').required()
})

const modificarIdEstadoEntregaCompra = Joi.object({
  id_estado_entrega: id.required()
})

module.exports = {
  paramsComprasSchema,
  queryComprasSchema,
  crearCompraSchema,
  modificarDetallesSchema,
  modificarIdEstadoEntregaCompra

}
