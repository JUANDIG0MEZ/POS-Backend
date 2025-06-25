async function crearFacturaCompra (body) {
  const transaction = await sequelize.transaction()

  try {
    // Variables necesarias
    const fechaActual = new Date()
    const fechaFormato = fechaActual.toISOString().split('T')[0]
    const horaFormato = fechaActual.toTimeString().split(' ')[0]
    const clienteId = Number(body.info.cliente_id)
    const estadoEntregaId = Number(body.info.estado_entrega_id)
    const nombreCliente = body.info.nombre_cliente ? body.info.nombre_cliente : null
    const pagado = Number(body.info.pagado)
    const total = Number(body.info.total)

    const detalles = body.datos

    // Validaciones
    if (clienteId < 2 && pagado !== total) {
      throw new Error('Para este cliente el valor pagado de la factura debe ser igual al total')
    }

    // Crear la compra
    const compraNueva = {
      fecha: fechaFormato,
      hora: horaFormato,
      cliente_id: clienteId,
      estado_entrega_id: estadoEntregaId,
      nombre_cliente: nombreCliente
    }
    const compra = await Compra.create(compraNueva, { transaction })

    // Agregar los detalles de la compra
    for (const detalle of detalles) {
      await DetalleCompra.create({
        ...detalle,
        compra_id: compra.id
      }, { transaction })
    }

    // Agregarle el valor pagado a la compra
    await compra.reload({ transaction })

    if (pagado < compra.total && clienteId < 2) {
      throw new Error('El cliente no puede tener deudas')
    }

    compra.pagado = pagado

    // Se devuelve las nuevas cantidades del producto para actualizarlas en el fronted
    const productos = []
    for (const detalle of detalles) {
      const producto = await Producto.findByPk(detalle.producto_id, {
        attributes: ['nombre', 'precio_compra']
      })
      productos.push(producto)
    }

    await compra.save({ transaction })

    await transaction.commit()
    return {
      productos
    }
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

module.exports = {
  crearFacturaCompra
}
