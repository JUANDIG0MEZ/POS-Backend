const { MetodoPago, Configuracion } = require('../../database/models')

async function cargarMetodosPago () {
  const metodos = await MetodoPago.findAll({
    raw: true
  })

  return metodos
}

async function cargarConfiguracion ({ usuario }) {
  const {
    idUsuario
  } = usuario
  const configuracion = await Configuracion.findOne({ where: { id_usuario: idUsuario } })
  return configuracion
}

module.exports = {
  cargarMetodosPago,
  cargarConfiguracion
}
