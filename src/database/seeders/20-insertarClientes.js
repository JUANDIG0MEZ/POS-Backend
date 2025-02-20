const {cargarClientes} = require('../datosFaker');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const clientes = cargarClientes()
    return await queryInterface.bulkInsert('clientes', clientes, {})
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('clientes', null, { truncate: true})
  }
};
