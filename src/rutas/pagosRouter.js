const express = require('express')

const {
  cargarClientePagos
} = require('')

const router = express.Router()

router.get('/cliente/:id/pagos', async (req, res, next) => {
  try {
    const { id } = req.params()
    const query = req.query()
    const pagos = cargarClientePagos(id, query)
  } catch (error) {
    next(error)
  }
})

module.exports = router
