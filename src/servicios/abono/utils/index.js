function crearDescripcionAbonoVenta ({ venta_id, valor, id_metodo_pago, descripcion }) {
  // Validaciones
  if (id_metodo_pago > 1 && !descripcion) throw new Error('Debes agregar informacion del pago')

  let descripcionCompleta = ''
  if (Number(valor) > 0) {
    descripcionCompleta = `Abono a la venta #${venta_id}`
    if (id_metodo_pago > 1) descripcionCompleta += 'Info: ' + descripcion
  }
  return descripcionCompleta
}

module.exports = {
  crearDescripcionAbonoVenta
}
