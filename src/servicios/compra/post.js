const { sequelize, Secuencia, Compra, DetalleCompra, Producto } = require('../../database/models')
const { crearAbono } = require('../abono/post')

async function crearFacturaCompra ({ idUsuario, info, detalles }) {
  // Esta funcion consiste de 3 pasos.
  // 1- Crear compra y agregar sus detalles
  // 2-
  const transaction = await sequelize.transaction()

  try {
    console.log(info)

    const {
      cliente_id,
      id_metodo_pago,
      id_estado_entrega,
      pagado,
      total,
      descripcion,
      nombre_cliente
    } = info

    // Variables necesarias
    const fechaActual = new Date()
    const fechaFormato = fechaActual.toISOString().split('T')[0]
    const horaFormato = fechaActual.toTimeString().split(' ')[0]

    // Validaciones iniciales
    if (pagado > total) throw new Error('El valor pagado no puede ser mayor al total.')
    if (cliente_id < 2 && (pagado !== total || !nombre_cliente)) throw new Error('Para este cliente el valor pagado de la factura debe ser igual al total.')
    if (id_metodo_pago > 1 && !descripcion) throw new Error('Debes agregar informacion del pago')
    const secuencia = await Secuencia.findOne({
      where: { id: idUsuario }
    })

    const compraId = secuencia.compra_id

    // Crear la compra
    const compraNueva = {
      id_usuario: idUsuario,
      compra_id: compraId,
      fecha: fechaFormato,
      hora: horaFormato,
      cliente_id,
      id_metodo_pago,
      id_estado_entrega,
      nombre_cliente
    }

    // CREAR LA COMPRA Y SUS DETALLES
    const compra = await Compra.create(compraNueva, { transaction })

    for (const detalle of detalles) {
      const {
        producto_id,
        cantidad,
        precio
      } = detalle

      const producto = Producto.findOne({ where: { id_usuario: idUsuario, producto_id } })

      const detalleCrear = {
        id_producto: producto.id,
        cantidad,
        precio
      }

      await DetalleCompra.create({
        detalleCrear,
        id_compra: compra.id
      }, { transaction })
    }

    let descripcionCompleta = ''
    // Agregarle el valor pagado a la compra
    await compra.reload({ transaction })
    if (pagado > compra.total) throw new Error('El valor pagado no puede ser mayor al total')

    if (pagado > 0) descripcionCompleta = `Abono a factura ${compraId}.`
    if (metodo_pago_id > 1) descripcionCompleta = descripcionCompleta + ' Info ' + descripcion

    compra.pagado = pagado
    await compra.save({ transaction })
    secuencia.compra_id += 1
    await secuencia.save({ transaction })

    await crearAbono({ idUsuario, cliente_id, metodo_pago_id, valor: pagado, descripcionCompleta }, transaction)

    // Productos modificados
    const productos = []
    for (const detalle of detalles) {
      const producto = await Producto.findOne({
        where: { id_usuario: idUsuario, producto_id: detalle.producto_id },
        attributes: ['producto_id', 'precio_compra', 'cantidad', 'total']
      })
      productos.push(producto)
    }

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
