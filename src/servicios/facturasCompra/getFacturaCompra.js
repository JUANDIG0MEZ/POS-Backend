const {
  Compra,
  DetalleCompra
} = require('../../database/models')

const {
  OpcionesGetCompras,
  OpcionesGetCompra,
  OpcionesGetDetalle
} = require('./clase')

// Obtener varias facturas de compras.
async function cargarFacturasCompra (query) {
  const { count, rows } = await Compra.findAndCountAll(
    {
      include: OpcionesGetCompras.incluir(),
      where: OpcionesGetCompras.donde(query),
      attributes: OpcionesGetCompras.atributos(query),
      limit: Math.min(Number(query.limit), 100),
      offset: Number(query.offset),
      order: OpcionesGetCompras.orden(query)
    }
  )
  return { count, rows }
}

// Obtener informacion de una factura de compra.
async function cargarFacturaCompra (id) {
  const info = await Compra.findByPk(id, {
    attributes: OpcionesGetCompra.atributos(),
    include: OpcionesGetCompra.incluir()
  })

  const datos = await DetalleCompra.findAll({
    where: {
      compra_id: id
    },
    attributes: OpcionesGetDetalle.atributos(),
    include: OpcionesGetDetalle.incluir()
  })

  return { datos, info }
}

module.exports = {
  cargarFacturasCompra,
  cargarFacturaCompra
}
