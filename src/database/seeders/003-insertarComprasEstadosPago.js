const { CompraEstadoPago } = require('../models')
const { cargarEstadosPagoCompra } = require('../datosFaker')

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const estados = cargarEstadosPagoCompra()

    const transaction = await queryInterface.sequelize.transaction()
    console.log('Estados de pago de compra', estados.slice(0, 5))
    await CompraEstadoPago.bulkCreate(estados, {
      individualHooks: true,
      validate: true,
      transaction
    })
    await transaction.commit()
  },

}
