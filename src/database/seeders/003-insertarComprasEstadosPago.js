'use strict'
const { CompraEstadoPago } = require('../models')
const { estadosPagoCompra } = require('../datosFaker')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const estados = estadosPagoCompra()

    const transaction = await queryInterface.sequelize.transaction()
    console.log('Estados de pago de compra', estados.slice(0, 1))
    await CompraEstadoPago.bulkCreate(estados, {
      individualHooks: true,
      validate: true,
      transaction
    })
    await transaction.commit()
  }

}
