const { sequelize, Venta, DetalleVenta, Secuencia, Cliente, Producto } = require('../../database/models')
const { crearPago } = require('../../servicios/pago/post.js')
const { multiplicarYRedondear } = require('../../utils/decimales.js')
async function crearVenta ({ idUsuario, info, detalles }) {
  const transaction = await sequelize.transaction()

  try {
    const {
      cliente_id,
      id_metodo_pago,
      id_estado_entrega,
      pagado,
      total,
      descripcion,
      nombre_cliente,
      direccion
    } = info

    // Variables necesarias
    const fechaActual = new Date()
    const fechaFormato = fechaActual.toISOString().split('T')[0]
    const horaFormato = fechaActual.toTimeString().split(' ')[0]

    // Validaciones
    if (cliente_id < 2 && pagado !== total) {
      throw new Error('Para este cliente el valor pagado de la factura debe ser igual al total')
    }

    const secuencia = await Secuencia.findOne({ where: { id: idUsuario } })
    const cliente = await Cliente.findOne({ where: { id_usuario: idUsuario, cliente_id } })
    const ventaId = secuencia.venta_id

    // Crear la compra
    const ventaNueva = {
      id_usuario: idUsuario,
      venta_id: ventaId,
      id_cliente: cliente.id,
      fecha: fechaFormato,
      hora: horaFormato,
      id_estado_entrega,
      id_metodo_pago,
      nombre_cliente,
      direccion
    }

    const venta = await Venta.create(ventaNueva, { transaction })
    // Agregar los detalles de la compra
    for (const detalle of detalles) {
      const { producto_id, cantidad, precio } = detalle
      const producto = await Producto.findOne({ where: { id_usuario: idUsuario, producto_id } })

      const detalleCrear = {
        id_producto: producto.id,
        id_venta: venta.id,
        cantidad,
        precio,
        subtotal: multiplicarYRedondear(cantidad, precio)
      }

      await DetalleVenta.create(detalleCrear, { transaction })
    }

    let descripcionCompleta = ''
    await venta.reload({ transaction })
    if (pagado > venta.total) throw new Error('El valor abonado no puede ser mayor al total')
    if (pagado > 0) {
      if (id_metodo_pago > 1) descripcionCompleta = 'Info: ' + descripcion
      descripcionCompleta = `Pago a venta #${ventaId}. ` + descripcionCompleta
      await crearPago({ idUsuario, id_cliente: cliente.id, id_metodo_pago, valor: venta.total, descripcion: descripcionCompleta }, transaction)
    }

    venta.pagado = pagado
    secuencia.venta_id += 1

    await venta.save({ transaction })
    await secuencia.save({ transaction })

    const productos = []
    for (const detalle of detalles) {
      const producto = await Producto.findOne({
        where: { id_usuario: idUsuario, producto_id: detalle.producto_id },
        attributes: ['producto_id', 'cantidad', 'total']
      })
      productos.push(producto)
    }

    await transaction.commit()
    return {
      productos
    }
  } catch (error) {
    await transaction.rollback()
    throw new Error(error)
  }
}

module.exports = {
  crearVenta
}
