const {cargarDetallesVentas} = require('../datosFaker');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('detalles_ventas', cargarDetallesVentas(),{})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('detalles_ventas', null, {})
  }
};
