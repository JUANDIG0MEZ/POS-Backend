const { cargarTiposCliente} = require('../datosFaker')
const {ClienteTipo} = require('../models')

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const clientes = cargarTiposCliente()
    const transaction = await queryInterface.sequelize.transaction()
    console.log("Clientes", clientes.slice(0, 5))
    await ClienteTipo.bulkCreate(clientes, {
      individualHooks: true ,
      validate: true
    })
    await transaction.commit()
  },

};
