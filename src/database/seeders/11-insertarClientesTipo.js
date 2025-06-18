const { cargarTiposCliente } = require('../datosFaker')
const { ClienteTipo } = require('../models')

'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const clientes = cargarTiposCliente()
    const transaction = await queryInterface.sequelize.transaction()
    await ClienteTipo.bulkCreate(clientes, {
      individualHooks: true,
      validate: true
    })
    await transaction.commit()
  }

};
