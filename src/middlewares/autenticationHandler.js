const secretKey = process.env.JWT_SECRET
const { ErrorUsuario } = require('../errors/usuario')
const jwt = require('jsonwebtoken')

function requireUser (req, res, next) {
  try {
    const token = req.cookies.access_token
    console.log('Token recibido:', token)
    if (!token) throw new ErrorUsuario('Acceso no autorizado')

    const payload = jwt.verify(token, secretKey)
    req.usuario = payload
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  requireUser
}
