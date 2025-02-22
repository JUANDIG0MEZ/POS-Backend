const {cargarPagos} = require('../datosFaker')

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const pagos = await cargarPagos()
    await queryInterface.bulkInsert('pagos', pagos, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('pagos', null, {});
  }
};
