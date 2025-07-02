const {
  ErrorUsuario
} = require('../errors/usuario')

function validatorHandler (schema, property, convert = false) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      convert,
      stripUnknown: true
    })
    if (error) return next(new ErrorUsuario(error.message))

    req.validated = req.validated || {}
    req.validated[property] = value
    next()
  }
}

module.exports = {
  validatorHandler
}
