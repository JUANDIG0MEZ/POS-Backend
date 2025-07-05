class FormatearGetClientes {
  static formatear (cliente) {
    return {
      id: cliente.cliente_id,
      nombre: cliente.nombre,
      tipo: cliente.tipo,
      por_pagarle: cliente.por_pagarle,
      debe: cliente.debe
    }
  }

  static formatearLista (categorias) {
    return categorias.map(categoria => this.formatear(categoria))
  }
}

class FormatearGetVentaCliente {
  static formatear (venta) {
    return {
      id: venta.venta_id,
      fecha: venta.fecha,
      hora: venta.hora,
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

class FormatearGetCompraCliente {
  static formatear (compra) {
    return {
      id: compra.compra_id,
      fecha: compra.fecha,
      hora: compra.hora,
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

class FormatearGetAbonoCliente {
  static formatear (abono) {
    return {
      id: abono.abono_id,
      fecha: abono.fecha,
      hora: abono.hora,
      metodo_pago: abono.metodo_pago,
      descripcion: abono.descripcion,
      valor: abono.valor
    }
  }

  static formatearLista (abonos) {
    return abonos.map(abono => this.formatear(abono))
  }
}

class FormatearGetPagoCliente {
  static formatear (pago) {
    return {
      id: pago.pago_id,
      fecha: pago.fecha,
      hora: pago.hora,
      metodo_pago: pago.metodo_pago,
      descripcion: pago.descripcion,
      valor: pago.valor
    }
  }

  static formatearLista (pagos) {
    return pagos.map(pago => this.formatear(pago))
  }
}

module.exports = {
  FormatearGetClientes,
  FormatearGetVentaCliente,
  FormatearGetCompraCliente,
  FormatearGetAbonoCliente,
  FormatearGetPagoCliente
}
