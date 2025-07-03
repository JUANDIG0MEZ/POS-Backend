const { Abono, Secuencia } = require('../../database/models')

async function crearAbono ({ idUsuario, id_cliente, id_metodo_pago, valor, descripcion }, transaction) {
  const fecha = new Date().toISOString().split('T')[0]
  const hora = new Date().toTimeString().split(' ')[0]

  const secuencia = await Secuencia.findByPk(idUsuario)

  const nuevoAbono = {
    id_usuario: idUsuario,
    abono_id: secuencia.abono_id,
    id_cliente,
    id_metodo_pago,
    valor,
    descripcion,
    fecha,
    hora
  }

  secuencia.abono_id += 1
  await secuencia.save({ transaction })

  await Abono.create(nuevoAbono, { transaction })
}

module.exports = {
  crearAbono
}

// async function crearAbonoVenta (body, idFactura) {
//   const transaction = await sequelize.transaction()
//   try {
//     const valorAbono = Number(body.valor)
//     const metodoPagoId = Number(body.metodoPagoId)

//     const venta = await Venta.findByPk(idFactura, {
//       transaction,
//       lock: transaction.LOCK.UPDATE
//     })

//     const porPagar = Number(venta.por_pagar)
//     if (valorAbono > porPagar) {
//       throw Error('El abono es mayor a la deuda')
//     }
//     venta.pagado = venta.pagado + valorAbono

//     await venta.save({ transaction })

//     const infoAbono = {
//       valor: valorAbono,
//       metodo_pago_id: metodoPagoId,
//       cliente_id: venta.cliente_id,
//       descripcion: body.descripcion
//     }

//     await crearAbono(infoAbono, transaction)
//     await transaction.commit()

//     return {
//       pagado: venta.pagado
//     }
//   } catch (error) {
//     await transaction.rollback()
//     throw error
//   }
// }

// async function crearAbonoVentas (body, idCliente) {
//   const transaction = await sequelize.transaction()
//   try {
//     const valorAbono = Number(body.valor)
//     const metodoPagoId = Number(body.metodoPagoId)
//     const cliente = await Cliente.findByPk(idCliente, { transaction })

//     if (valorAbono > Number(cliente.debe)) {
//       throw Error('El abono es mayor a la deuda')
//     }

//     const ventas = await Venta.findAll({
//       where: {
//         estado_pago_id: 1,
//         cliente_id: idCliente
//       },
//       attributes: ['id', 'total', 'pagado', 'por_pagar', 'cliente_id'],
//       order: [['id', 'ASC']],
//       transaction,
//       lock: transaction.LOCK.UPDATE
//     })

//     let valorRestante = valorAbono

//     for (const venta of ventas) {
//       const porPagar = venta.por_pagar

//       if (valorRestante <= porPagar) {
//         venta.pagado = venta.pagado + valorRestante
//         await venta.save({ transaction })
//         break
//       } else {
//         valorRestante = valorRestante - porPagar
//         venta.pagado = venta.total
//         await venta.save({ transaction })
//       }
//     }

//     await cliente.reload({ transaction })

//     const infoAbono = {
//       valor: valorAbono,
//       metodo_pago_id: metodoPagoId,
//       cliente_id: idCliente,
//       descripcion: body.descripcion
//     }

//     await crearAbono(infoAbono, transaction)

//     await transaction.commit()
//     return {
//       debe: cliente.debe
//     }
//   } catch (error) {
//     await transaction.rollback()
//     throw error
//   }
// }
