const {cargarClientes} = require('../datosFaker');
const {Cliente} = require('../models');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const clientes = cargarClientes()
    const transaction = await queryInterface.sequelize.transaction();
    console.log("Clientes", clientes.slice(0, 5))
    await Cliente.bulkCreate(clientes, {
      individualHooks: true ,
      validate: true,
      transaction
    })
    await transaction.commit()
  },


};
