class FormatearCompras {
  static formatear (compra) {
    return {
      id: compra.compra_id,
      fecha: compra.fecha,
      nombre_cliente: compra.nombre_cliente,
      estado_entrega: compra.estado_entrega,
      estado_pago: compra.estado_pago,
      por_pagar: compra.por_pagar,
      total: compra.total

    }
  }

  static formatearLista (compras) {
    return compras.map(compra => this.formatear(compra))
  }
}

class FormatearDetalles {
  static formatear (detalle) {
    return {
      id: detalle.id_producto,
      descripcion: detalle.nombre,
      medida: detalle.medida,
      cantidad: detalle.cantidad,
      precio: detalle.precio,
      subtotal: detalle.subtotal
    }
  }

  static formatearLista (detalles) {
    return detalles.map(compra => this.formatear(compra))
  }
}

module.exports = {
  FormatearCompras,
  FormatearDetalles
}
