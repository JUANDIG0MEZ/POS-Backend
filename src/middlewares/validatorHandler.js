const {
  ErrorUsuario
} = require('../errors/usuario')

function validatorHandler (schema, property) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      stripUnknown: true
    })
    if (error) {
      const errorUsuario = new ErrorUsuario(error.message)
      return next(errorUsuario)
    }
    req[property] = value
    next()
  }
}

module.exports = {
  validatorHandler
}
