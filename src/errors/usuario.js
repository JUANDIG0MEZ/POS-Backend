class ErrorUsuario extends Error {
  constructor (mensaje, statusCode = 400) {
    super(mensaje)
    this.name = 'ErrorUsuario'
    this.statusCode = statusCode
  }
}

module.exports = {
  ErrorUsuario
}
