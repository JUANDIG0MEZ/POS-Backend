const express = require('express')
const { respuesta } = require('./funcion')
const { crearPagoCompraSchema, crearPagoClienteSchema } = require('../schemas/pagos')
const { validatorHandler } = require('../middlewares/validatorHandler')
const { requireUser } = require('../middlewares/autenticationHandler')
const {
  crearPagoCompra,
  crearPagoCliente
//   crearPagoCompras
} = require('../servicios/pago/post.js')
// const { cargarPagosCliente } = require('../servicios/clientes/getCliente')

const router = express.Router()

// router.get('/',
//   validatorHandler(queryPagosSchema, 'query'),
//   validatorHandler(paramsPagosSchema, 'params'),
//   async (req, res) => {
//     const data = await cargarPagosCliente()
//     res.json(respuesta('Pagos cargados.', data))
//   }
// )

router.post('/compra',
  requireUser,
  validatorHandler(crearPagoCompraSchema, 'body'),
  async (req, res) => {
    const {
      compra_id,
      valor,
      id_metodo_pago,
      descripcion
    } = req.validated.body
    const { idUsuario } = req.usuario
    const data = await crearPagoCompra({ idUsuario, compra_id }, { id_metodo_pago, valor, descripcion })
    res.json(respuesta('Pago realizado', data))
  })

router.post('/cliente',
  requireUser,
  validatorHandler(crearPagoClienteSchema, 'body'),
  async (req, res) => {
    const { idUsuario } = req.usuario
    const {
      cliente_id,
      valor,
      id_metodo_pago,
      descripcion
    } = req.validated.body
    const data = await crearPagoCliente({ idUsuario, cliente_id }, { id_metodo_pago, valor, descripcion })
    res.json(respuesta('Pago realizado', data))
  }
)

module.exports = router
