const { cargarAbonos} = require('../datosFaker')

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const abonos = await cargarAbonos()
    await queryInterface.bulkInsert('abonos', abonos, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('abonos', null, {})
  }
};
