class FormatearAjustesInventario {
  static formatear (ajuste) {
    return {
      id: ajuste.ajuste_id,
      fecha: ajuste.fecha,
      hora: ajuste.hora
    }
  }

  static formatearLista (ajustes) {
    return ajustes.map(ajuste => this.formatear(ajuste))
  }
}

module.exports = {
  FormatearAjustesInventario
}
