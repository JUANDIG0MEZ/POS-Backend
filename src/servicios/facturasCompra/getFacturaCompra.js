const {
  Compra,
  CompraEstadoEntrega,
  CompraEstadoPago,
  Cliente,
  DetalleCompra,
  Producto,
  ProductoMarca,
  ProductoMedida
} = require('../../database/models')

const {
  ClaseFacturaCompra
} = require('./clase')

async function cargarFacturasCompra (query) {
  const { count, rows } = await Compra.findAndCountAll(
    {
      include: ClaseFacturaCompra.incluir(),
      where: ClaseFacturaCompra.where(query),
      attributes: { exclude: ['cliente_id', 'pagado'] },
      limit: Number(query.limit),
      offset: Number(query.offset),
      order: ClaseFacturaCompra.orden(query)
    }
  )

  const compras = ClaseFacturaCompra.formatear(rows)

  return { count, rows: compras }
}

async function cargarEstadosComprasEntrega () {
  const estados = await CompraEstadoEntrega.findAll()

  return estados
}

async function cargarMetodosComprasPago () {
  const estados = await CompraEstadoPago.findAll()

  return estados
}

async function cargarFacturaCompra (id) {
  const info = await Compra.findByPk(id, {
    include: {
      model: Cliente,
      as: 'clienteCompra',
      attributes: ['nombre', 'email', 'telefono']
    },
    attributes: { exclude: ['cliente_id'] }
  })

  const infoFormateada = {
    id: info.id,
    fecha: info.fecha,
    hora: info.hora,
    cliente: info.clienteCompra.nombre,
    email: info.clienteCompra.email,
    telefono: parseInt(info.clienteCompra.telefono),
    pagado: parseInt(info.pagado),
    total: parseInt(info.total),
    estado: info.estado
  }

  const datos = await DetalleCompra.findAll({
    where: {
      compra_id: id
    },
    include: {
      model: Producto,
      as: 'productoDetalleCompra',
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
      nombre: dato.productoDetalleCompra.nombre,
      marca: dato.productoDetalleCompra.marcaProducto.nombre,
      medida: dato.productoDetalleCompra.medidaProducto.nombre,
      cantidad: parseInt(dato.cantidad),
      precio: parseInt(dato.precio),
      subtotal: parseInt(dato.subtotal)
    }
  })

  return { info: infoFormateada, datos: datosFormateados }
}

async function cargarCompraCliente (id, limit, offset) {
  // Se traen las compras al cliente con el id que se recibe
  const { count, rows } = await Compra.findAndCountAll({
    where: {
      cliente_id: id
    },
    include: { model: Cliente, as: 'clienteCompra', attributes: ['nombre'] },
    limit,
    offset,
    order: [['id', 'DESC']]
  })

  const comprasFormateadas = rows.map(compra => {
    return {
      id: compra.id,
      fecha: compra.fecha,
      hora: compra.hora,
      cliente: compra.clienteCompra.nombre,
      por_pagar: compra.por_pagar,
      total: compra.total,
      estado: compra.estado
    }
  })

  return { count, rows: comprasFormateadas }
}

module.exports = {
  cargarFacturasCompra,
  cargarEstadosComprasEntrega,
  cargarMetodosComprasPago,
  cargarFacturaCompra,
  cargarCompraCliente
}
