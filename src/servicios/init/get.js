const { MetodoPago } = require('../../database/models')

async function cargarMetodosPago () {
  const metodos = await MetodoPago.findAll({
    raw: true
  })

  return metodos
}

module.exports = {
  cargarMetodosPago
}
