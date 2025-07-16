const Decimal = require('decimal.js')
const { crearDescripcionPagoCompra } = require('../pago/utils')
const { sequelize, Secuencia, Compra, DetalleCompra, Producto, Cliente } = require('../../database/models')
const { multiplicarYRedondear, redondear } = require('../../utils/decimales')
const { crearPago } = require('../pago/post.js')
const { generarFecha, generarHora } = require('../../utils/fechas')

async function crearFacturaCompra ({ idUsuario, info, detalles }) {
  const transaction = await sequelize.transaction()

  try {
    const {
      cliente_id,
      id_metodo_pago,
      id_estado_entrega,
      pagado,
      total,
      descripcion,
      nombre_cliente
    } = info

    // Validaciones iniciales
    const totalDecimal = new Decimal(total)
    const pagadoDecimal = new Decimal(pagado)
    if (pagadoDecimal.gt(totalDecimal)) throw new Error('El valor pagado no puede ser mayor al total.')
    if (cliente_id < 2 && (!pagadoDecimal.eq(totalDecimal) || !nombre_cliente)) throw new Error('Para este cliente el valor pagado de la factura debe ser igual al total.')

    const secuencia = await Secuencia.findOne({ where: { id: idUsuario } })
    const cliente = await Cliente.findOne({ where: { id_usuario: idUsuario, cliente_id } })
    const compraId = secuencia.compra_id

    // Crear la compra
    const compraNueva = {
      id_usuario: idUsuario,
      compra_id: compraId,
      fecha: generarFecha(),
      hora: generarHora(),
      id_cliente: cliente.id,
      id_metodo_pago,
      id_estado_entrega,
      nombre_cliente
    }

    // CREAR LA COMPRA Y SUS DETALLES
    const compra = await Compra.create(compraNueva, { transaction })

    let totalCompraDecimal = new Decimal(0)
    for (const detalle of detalles) {
      const { producto_id, cantidad, precio } = detalle
      const producto = await Producto.findOne({ where: { id_usuario: idUsuario, producto_id } })

      const subTotal = multiplicarYRedondear(cantidad, precio)

      const detalleCrear = {
        id_producto: producto.id,
        id_compra: compra.id,
        cantidad,
        precio,
        subtotal: subTotal.toString()
      }

      totalCompraDecimal = totalCompraDecimal.plus(subTotal)

      await DetalleCompra.create(detalleCrear, { transaction })
      await producto.decrement('cantidad', { by: cantidad, transaction })
    }

    const descripcionCompleta = crearDescripcionPagoCompra({ compra_id: compraId, pagado, id_metodo_pago, descripcion })
    await crearPago({ idUsuario, id_cliente: cliente.id, id_metodo_pago, valor: pagado, descripcion: descripcionCompleta }, transaction)

    await compra.update(
      {
        total: redondear(totalCompraDecimal).toString(),
        pagado: redondear(pagado).toString()
      }, { transaction })
    await secuencia.increment('compra_id', { by: 1, transaction })

    const porPagarDecimal = totalCompraDecimal.minus(pagadoDecimal)
    await cliente.increment('por_pagarle', { by: porPagarDecimal.toString(), transaction })

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
