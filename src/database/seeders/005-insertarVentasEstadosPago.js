'use strict'
const { VentaEstadoPago } = require('../models')
const { estadosPagoVenta } = require('../datosFaker')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const estados = estadosPagoVenta()

    const transaction = await queryInterface.sequelize.transaction()

    console.log('Estados de pago de venta', estados.slice(0, 1))

    await VentaEstadoPago.bulkCreate(estados, {
      individualHooks: true,
      validate: true,
      transaction
    })

    await transaction.commit()
  }

}
