'use strict'

const { tiposCliente } = require('../datosFaker')
const { ClienteTipo } = require('../models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const clientes = tiposCliente()
    const transaction = await queryInterface.sequelize.transaction()
    await ClienteTipo.bulkCreate(clientes, {
      individualHooks: true,
      validate: true
    })
    await transaction.commit()
  }

}
