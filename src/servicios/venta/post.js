const { sequelize, Venta, DetalleVenta, Secuencia, Cliente, Producto } = require('../../database/models')
const { crearPago } = require('../../servicios/pago/post.js')
const { multiplicarYRedondear, redondear } = require('../../utils/decimales.js')
const { generarFecha, generarHora } = require('../../utils/fechas.js')
const Decimal = require('decimal.js')
const { crearDescripcionAbonoVenta } = require('../abono/utils/index.js')
const { crearAbono } = require('../abono/post.js')
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

    const totalDecimal = new Decimal(total)
    const pagadoDecimal = new Decimal(pagado)

    if (pagadoDecimal.gt(totalDecimal)) throw new Error('El abono no puede ser mayor al total')
    if (cliente_id < 2 && (!pagadoDecimal.eq(totalDecimal) || !nombre_cliente)) {
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
      fecha: generarFecha(),
      hora: generarHora(),
      id_estado_entrega,
      id_metodo_pago,
      nombre_cliente,
      direccion
    }

    const venta = await Venta.create(ventaNueva, { transaction })
    // Agregar los detalles de la compra
    let totalVentaDecimal = new Decimal(0)
    for (const detalle of detalles) {
      const { producto_id, cantidad, precio } = detalle
      const producto = await Producto.findOne({ where: { id_usuario: idUsuario, producto_id } })

      const subTotal = multiplicarYRedondear(cantidad, precio)

      const detalleCrear = {
        id_producto: producto.id,
        id_venta: venta.id,
        cantidad,
        precio,
        subtotal: subTotal.toString()
      }
      totalVentaDecimal = totalVentaDecimal.plus(subTotal)

      await DetalleVenta.create(detalleCrear, { transaction })
      await producto.increment('cantidad', { by: cantidad, transaction })
    }

    if (pagadoDecimal.gt(0)) {
      const descripcionCompleta = crearDescripcionAbonoVenta({ venta_id: ventaId, pagado, id_metodo_pago, descripcion })
      await crearAbono({ idUsuario, id_cliente: cliente.id, id_metodo_pago, valor: pagado, descripcion: descripcionCompleta })
    }

    console.log('total Venta:', totalVentaDecimal.toString())
    console.log('pagdo Venta', pagado)

    await venta.update({
      total: redondear(totalVentaDecimal).toString(),
      pagado: redondear(pagado).toString()
    }, { transaction })
    await secuencia.increment('venta_id', { by: 1, transaction })

    const porPagarDecimal = totalVentaDecimal.minus(pagadoDecimal)
    await cliente.increment('debe', { by: porPagarDecimal.toString(), transaction })

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
