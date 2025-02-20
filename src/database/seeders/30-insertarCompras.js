const {cargarFacturasCompra} = require('../datosFaker')

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const facturas = cargarFacturasCompra()
    await queryInterface.bulkInsert('compras', facturas, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('compras', null, {})
  }
};
