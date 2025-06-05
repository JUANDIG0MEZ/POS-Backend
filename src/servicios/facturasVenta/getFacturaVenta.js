async function cargarFacturasVenta (query) {
  const { count, rows } = await Venta.findAndCountAll(
    {
      include: ClaseFacturaVenta.incluir(),
      where: ClaseFacturaVenta.where(query),
      attributes: { exclude: ['cliente_id', 'pagado'] },
      limit: Number(query.limit),
      offset: Number(query.offset),
      order: ClaseFacturaVenta.orden(query)
    }
  )
  const ventas = ClaseFacturaVenta.formatear(rows)
  return { count, rows: ventas }
}

async function cargarVentaCliente (id, limit, offset) {
  // Se traen las ventas al cliente con el id que se recibe
  const { count, rows } = await Venta.findAndCountAll({
    where: {
      cliente_id: id
    },
    include: {
      model: Cliente, as: 'clienteVenta', attributes: ['nombre']
    },
    limit,
    offset,
    order: [['id', 'DESC']]
  })

  const ventasFormateadas = rows.map(venta => {
    return {
      id: venta.id,
      fecha: venta.fecha,
      hora: venta.hora,
      cliente: venta.clienteVenta.nombre,
      por_pagar: venta.por_pagar,
      total: venta.total,
      estado: venta.estado
    }
  })
  return { count, rows: ventasFormateadas }
}

async function cargarFacturaVenta (id) {
  const factura = await Venta.findByPk(id, {
    include: {
      model: Cliente, as: 'clienteVenta', attributes: ['nombre', 'telefono', 'email']
    }
  })

  const facturaFormateada = {
    id: factura.id,
    fecha: factura.fecha,
    hora: factura.hora,
    cliente: factura.clienteVenta.nombre,
    email: factura.clienteVenta.email,
    direccion: factura.direccion,
    telefono: factura.clienteVenta.telefono,
    pagado: factura.pagado,
    total: factura.total,
    estado: factura.estado

  }

  const datos = await DetalleVenta.findAll({
    where: {
      venta_id: id
    },
    include: {
      model: Producto,
      as: 'productoDetalleVenta',
      attributes: ['nombre'],
      include: [
        { model: ProductoMarca, as: 'marcaProducto', attributes: ['nombre'] },
        { model: ProductoMedida, as: 'medidaProducto', attributes: ['nombre'] }

      ]
    }

  })

  const datosFormateados = datos.map(dato => {
    return {
      id: dato.producto_id,
      nombre: dato.productoDetalleVenta.nombre,
      marca: dato.productoDetalleVenta.marcaProducto.nombre,
      medida: dato.productoDetalleVenta.medidaProducto.nombre,
      cantidad: parseInt(dato.cantidad),
      precio: parseInt(dato.precio),
      subtotal: parseInt(dato.subtotal)
    }
  })
  return { info: facturaFormateada, datos: datosFormateados }
}

async function cargarEstadosVentasEntrega () {
  const estados = await VentaEstadoEntrega.findAll()

  return estados
}

async function cargarEstadosVentasPago () {
  const estados = await VentaEstadoPago.findAll()

  return estados
}
