const Joi = require('joi')

const string = Joi.string().min(3).max(255)

const entero = Joi.number().integer().positive()
const precio = Joi.number().positive()

// fecha => yyyy-mm-dd
// hora => hh:mm:ss
const fecha = Joi.date().iso()

const obtenerComprasSchema = Joi.object({
  id: entero,
  cliente: string,
  cliente_id: entero,
  estado_id: entero,
  desde: fecha,
  hasta: fecha
})

const crearCompraSchema = Joi.object({
  nombre: string,
  cliente_id: entero.required(),
  estado_id: entero.required(),
  pagado: precio.required(),

  productos: Joi.array().items(Joi.object({
    producto_id: entero.required(),
    cantidad: entero.required(),
    precio: precio.required(),
    subTotal: precio.required()
  }))

})

const actualizarProductosCompraSchema = Joi.object({
  productos: Joi.array().items(Joi.object({
    producto_id: entero.required(),
    cantidad: entero.required(),
    precio: precio.required(),
    subTotal: precio.required()
  }))

})

const cambiarEstadoCompraSchema = Joi.object({
  estado_id: entero.required()
})

const pagarCompraSchema = Joi.object({
  valor: precio.required()
})

module.exports = {
  obtenerComprasSchema,
  crearCompraSchema,
  actualizarProductosCompraSchema,
  cambiarEstadoCompraSchema,
  pagarCompraSchema

  // eliminarCompraSchema
}
