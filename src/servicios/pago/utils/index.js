function crearDescripcionPagoCompra ({ compra_id, valor, id_metodo_pago, descripcion }) {
  // Validaciones
  if (id_metodo_pago > 1 && !descripcion) throw new Error('Debes agregar informacion del pago')

  let descripcionCompleta = ''
  if (Number(valor > 0)) {
    descripcionCompleta = `Pago a la compra #${compra_id}`
    if (id_metodo_pago > 1) descripcionCompleta += 'Info: ' + descripcion
  }
  return descripcionCompleta
}

function crearDescripcionPagoCliente ({ valor, id_metodo_pago, descripcion }) {
  if (id_metodo_pago > 1 && !descripcion) throw new Error('Debes agregar informacion del pago')

  let descripcionCompleta = ''
  if (Number(valor > 0)) {
    descripcionCompleta = 'Paga a cliente. '
    if (id_metodo_pago > 1) descripcionCompleta += 'Info: ' + descripcion
  }
  return descripcionCompleta
}

module.exports = {
  crearDescripcionPagoCompra,
  crearDescripcionPagoCliente
}
