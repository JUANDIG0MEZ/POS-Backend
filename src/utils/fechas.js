function generarFecha () {
  // Variables necesarias
  const fechaActual = new Date()
  const fechaFormato = fechaActual.toISOString().split('T')[0]
  return fechaFormato
}

function generarHora () {
  const fechaActual = new Date()
  const horaFormato = fechaActual.toTimeString().split(' ')[0]
  return horaFormato
}

module.exports = {
  generarFecha,
  generarHora
}
