const {
  sequelize,
  DetalleVenta,
  Venta
} = require('../../database/models')

async function crearFacturaVenta (body) {
  const transaction = await sequelize.transaction()

  try {
    // Variables necesarias
    const fechaActual = new Date()
    const fechaFormato = fechaActual.toISOString().split('T')[0]
    const horaFormato = fechaActual.toTimeString().split(' ')[0]
    const clienteId = Number(body.info.cliente_id)
    const estadoEntregaId = Number(body.info.estado_entrega_id)
    const nombreCliente = body.info.nombre_cliente ? body.info.nombre_cliente : null
    const direccion = body.info.direccion ? body.info.direccion : null
    const pagado = Number(body.info.pagado)
    const total = Number(body.info.total)

    const detalles = body.datos

    // Validaciones
    if (clienteId < 2 && pagado !== total) {
      throw new Error('Para este cliente el valor pagado de la factura debe ser igual al total')
    }

    // Crear la compra
    const ventaNueva = {
      fecha: fechaFormato,
      hora: horaFormato,
      cliente_id: clienteId,
      estado_entrega_id: estadoEntregaId,
      nombre_cliente: nombreCliente,
      direccion
    }

    const venta = await Venta.create(ventaNueva, { transaction })

    // Agregar los detalles de la compra
    for (const detalle of detalles) {
      await DetalleVenta.create({
        ...detalle,
        venta_id: venta.id
      }, { transaction })
    }

    await venta.reload({ transaction })
    venta.pagado = pagado

    await venta.save({ transaction })

    await transaction.commit()
    return {
      factura: venta
    }
  } catch (error) {
    await transaction.rollback()
    throw new Error(error)
  }
}

module.exports = {
  crearFacturaVenta
}
