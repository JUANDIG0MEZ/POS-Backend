const {
  Producto,
  Compra,
  DetalleCompra,

  sequelize
} = require('../../database/models')

async function crearFacturaCompra (body) {
  const transaction = await sequelize.transaction()

  try {
    const fechaActual = new Date()
    const fechaFormato = fechaActual.toISOString().split('T')[0]
    const horaFormato = fechaActual.toTimeString().split(' ')[0]

    const compraNueva = {
      fecha: fechaFormato,
      hora: horaFormato,
      cliente_id: body.info.cliente_id,
      estado_entrega_id: body.info.estado_entrega_id,
      ...(body.info.nombre_cliente && { nombre_cliente: body.info.nombre_cliente })
    }

    const compra = await Compra.create(compraNueva, { transaction })

    const dataDetalles = body.datos

    // Agregar los detalles de la compra
    for (const detalle of dataDetalles) {
      await DetalleCompra.create({
        ...detalle,
        compra_id: compra.id
      }, { transaction })
    }

    await compra.reload({ transaction })

    if (body.info.pagado) {
      compra.pagado = parseInt(body.info.pagado)
    }

    // Se devuelve las nuevas cantidades del producto
    const productos = []
    for (const detalle of dataDetalles) {
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
