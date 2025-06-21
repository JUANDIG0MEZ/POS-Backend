const { ErrorUsuario } = require('../errors/ErrorUsuario')

function handlerError (err, req, res, next) {
  console.log(err)
  let mensaje = 'Ocurrio algun error.'
  if (err instanceof ErrorUsuario) {
    mensaje = err.mensaje
  }
  res.status(400).json({
    status: false,
    message: mensaje
  })
}

module.exports = {
  handlerError
}
