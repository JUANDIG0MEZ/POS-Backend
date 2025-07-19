const { Usuario, sequelize, Secuencia, Configuracion, Cliente } = require('../../database/models')
const jwt = require('jsonwebtoken')
const { ErrorUsuario } = require('../../errors/usuario')
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')

const JWT_SECRET_AUTH = process.env.JWT_SECRET_AUTH

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASSWORD
  }
})

async function enviarCoreoConfirmacion (email, url) {
  const mailOptions = {
    from: `"${process.env.APP_NAME}" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: 'Verifica tu cuenta',
    html: `
      <h1>¡Bienvenido a ${process.env.APP_NAME}!</h1>
      <p>Por favor confirma tu email ingresando el siguiente link: <strong><a href=${url}>click aqui!</a></strong></p>
    `
  }
  try {
    await transporter.sendMail(mailOptions)
  } catch (error) {
    throw new ErrorUsuario('Error al enviar el correo de verificación')
  }
}

async function registerUser ({ email }) {
  const token = crearToken({ email }, '3h')
  const url = process.env.URL_AUTH + `/confirm?token=${token}`
  await enviarCoreoConfirmacion(email, url)
}

async function confirmUser ({ token, contrasenia }) {
  const transaction = await sequelize.transaction()
  try {
    const payload = jwt.verify(token, JWT_SECRET_AUTH)
    const { email } = payload

    const usuarioExiste = await Usuario.findOne({
      where: { email },
      transaction,
      raw: true
    })

    if (usuarioExiste) throw new ErrorUsuario('Este email ya esta registrado')

    const hashedContrasenia = await bcrypt.hash(contrasenia, Number(process.env.BCRYPT_COST))
    const nuevoUsuario = {
      email,
      contrasenia: hashedContrasenia
    }
    const usuarioCreado = await Usuario.create(nuevoUsuario, {
      transaction
    })
    await Cliente.create({ id_usuario: usuarioCreado.id, nombre: 'Cliente no registrado' }, { transaction })
    await Secuencia.create({ id_usuario: usuarioCreado.id, cliente_id: 2 }, { transaction })
    await Configuracion.create({ id_usuario: usuarioCreado.id }, { transaction })

    await transaction.commit()
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

async function loginUser ({ email, contrasenia }) {
  const usuario = await Usuario.findOne({ where: { email } })
  const contraseniaValida = await bcrypt.compare(contrasenia, usuario.contrasenia)
  if (!contraseniaValida) throw new ErrorUsuario('Usuario y contrasenia no coinciden')

  const tokenSesion = crearToken({ idUsuario: usuario.id })
  return tokenSesion
}

function crearToken (payload, expiresIn = '12h') {
  return jwt.sign(payload, JWT_SECRET_AUTH, { expiresIn })
}

module.exports = {
  registerUser,
  confirmUser,
  crearToken,
  loginUser
}
