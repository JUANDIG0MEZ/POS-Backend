class FormatearClientes {
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

module.exports = {
  FormatearClientes
}
