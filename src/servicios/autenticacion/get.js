const { Usuario } = require('../../database/models')
const { ErrorUsuario } = require('../../errors/usuario')
const bcrypt = require('bcrypt')

async function autenticarUsuario ({ email, contrasenia }) {
  const usuarioDB = await Usuario.findOne({ where: { email } })
  if (!usuarioDB) throw new ErrorUsuario('El usuario no existe')
  if (!usuarioDB.verificado) throw new ErrorUsuario('Debes agregar el codigo para verificar el correo.')
  const contraseniaValida = await bcrypt.compare(contrasenia, usuarioDB.contrasenia)
  if (!contraseniaValida) throw new ErrorUsuario('Contrasenia invalida')

  return usuarioDB
}

module.exports = { autenticarUsuario }
