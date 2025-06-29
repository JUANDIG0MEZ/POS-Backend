class FormatearCategoria {
  static formatear (categoria) {
    return {
      id: categoria.categoria_id,
      nombre: categoria.nombre,
      descripcion: categoria.descripcion
    }
  }

  static formatearLista (categorias) {
    return categorias.map(categoria => this.formatear(categoria))
  }
}

module.exports = {
  FormatearCategoria
}
