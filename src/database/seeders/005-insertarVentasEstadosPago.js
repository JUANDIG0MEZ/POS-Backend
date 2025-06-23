const { VentaEstadoPago } = require('../models')
const { cargarEstadosPagoVenta } = require('../datosFaker')

'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const estados = cargarEstadosPagoVenta()

    const transaction = await queryInterface.sequelize.transaction()

    console.log('Estados de pago de venta', estados.slice(0, 5))

    await VentaEstadoPago.bulkCreate(estados, {
      individualHooks: true,
      validate: true,
      transaction
    })

    await transaction.commit()
  }

}
