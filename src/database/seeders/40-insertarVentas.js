const { cargarFacturasVenta } = require('../datosFaker')

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const facturas = cargarFacturasVenta()
    await queryInterface.bulkInsert('ventas', facturas, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ventas', null, {})
  }
};
