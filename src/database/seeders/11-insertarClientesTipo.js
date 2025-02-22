const { tiposClientes} = require('../datosFaker')
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const clientes = tiposClientes()
    await queryInterface.bulkInsert('clientes_tipos', clientes, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('clientes_tipos', null, {})
  }
};
