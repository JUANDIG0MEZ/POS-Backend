function crearDescripcionPagoCompra ({ compra_id, pagado, id_metodo_pago, descripcion }) {
  // Validaciones
  if (id_metodo_pago > 1 && !descripcion) throw new Error('Debes agregar informacion del pago')

  let descripcionCompleta = ''
  if (pagado > 0) {
    descripcionCompleta = `Abono a la compra #${compra_id}`
    if (id_metodo_pago > 1) descripcionCompleta += 'Info: ' + descripcion
  }
  return descripcionCompleta
}

module.exports = {
  crearDescripcionPagoCompra
}
