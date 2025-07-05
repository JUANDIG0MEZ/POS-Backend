class FormatearGetVentas {
  static formatear (venta) {
    return {
      id: venta.venta_id,
      fecha: venta.fecha,
      nombre_cliente: venta.nombre_cliente,
      direccion: venta.direccion,
      estado_entrega: venta.estado_entrega,
      estado_pago: venta.estado_pago,
      por_pagar: venta.por_pagar,
      total: venta.total

    }
  }

  static formatearLista (ventas) {
    return ventas.map(venta => this.formatear(venta))
  }
}

class FormatearGetDetallesVenta {
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
    return detalles.map(detalle => this.formatear(detalle))
  }
}

module.exports = {
  FormatearGetVentas,
  FormatearGetDetallesVenta
}
