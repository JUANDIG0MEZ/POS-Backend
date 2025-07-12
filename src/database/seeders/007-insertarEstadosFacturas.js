'use strict'

const { EstadoFactura } = require('../models/index.js')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const estados = estadosFacturas()

    const transaction = await queryInterface.sequelize.transaction()

    for (let i = 0; i < estados.length; i++) {
      await EstadoFactura.create(estados[i], {
        individualHooks: true,
        validate: true,
        transaction
      })
    }

    await transaction.commit()
  }

}
