const { Usuario, sequelize } = require('../../database/models')
const jwt = require('jsonwebtoken')
const { ErrorUsuario } = require('../../errors/usuario')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASSWORD
  }
})

async function enviarCorreoVerificacion (email, codigo) {
  const mailOptions = {
    from: `"${process.env.APP_NAME}" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: 'Verifica tu cuenta',
    html: `
      <h1>¡Bienvenido a ${process.env.APP_NAME}!</h1>
      <p>Por favor verifica tu email ingresando el siguiente codigo: <code>${codigo}</code></p>
    `
  }
  try {
    await transporter.sendMail(mailOptions)
  } catch (error) {
    throw new ErrorUsuario('Error al enviar el correo de verificación')
  }
}

function generarCodigoVerificacion () {
  const charts = '0123456789'
  let codigo = ''
  const longitudCodigo = 6
  for (let i = 0; i < longitudCodigo; i++) {
    const indiceAleatorio = crypto.randomInt(0, charts.length)
    codigo += charts[indiceAleatorio]
  }
  return codigo
}

async function crearUsuario ({ email, contrasenia }) {
  const transaction = await sequelize.transaction()
  try {
    const usuarioExiste = await Usuario.findOne({
      where: { email },
      transaction,
      raw: true
    })

    if (usuarioExiste) throw new ErrorUsuario('Este email ya esta registrado')

    const codigoVerificacion = generarCodigoVerificacion()
    const hashedContrasenia = await bcrypt.hash(contrasenia, Number(process.env.BCRYPT_COST))
    const nuevoUsuario = {
      codigoVerificacion,
      email,
      contrasenia: hashedContrasenia
    }
    const usuarioCreado = await Usuario.create(nuevoUsuario, {
      transaction,
      raw: true
    })

    await enviarCorreoVerificacion(email, codigoVerificacion)

    await transaction.commit()
    return usuarioCreado
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

async function verificarUsuario ({ email, codigoVerificacion }) {
  const usuario = await Usuario.findOne({ where: { email } })
  if (!usuario) throw new ErrorUsuario('Usuario no encontrado')
  if (usuario.verificado) throw new ErrorUsuario('Usuario ya verificado')
  if (new Date() > usuario.expiracionCodigo) throw new ErrorUsuario('El codigo ha expirado')
  if (codigoVerificacion !== usuario.codigoVerificacion) throw new ErrorUsuario('Codigo incorrecto')

  usuario.verificado = true
  usuario.codigoVerificacion = null
  usuario.expiracionCodigo = null
  await usuario.save()
  return usuario
}

function crearToken (payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' })
}

module.exports = {
  crearUsuario,
  crearToken,
  verificarUsuario,
  enviarCorreoVerificacion
}
