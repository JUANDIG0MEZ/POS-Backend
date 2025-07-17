function respuesta (mensaje, data, status = true) {
  return {
    success: status,
    message: mensaje,
    data
  }
}

module.exports = {
  respuesta
}
