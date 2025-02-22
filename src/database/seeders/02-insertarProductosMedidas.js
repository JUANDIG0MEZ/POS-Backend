const {cargarMedidas} = require('../datosFaker');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const medidas = cargarMedidas()
    await queryInterface.bulkInsert('productos_medidas', medidas, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('productos_medidas', null, { truncate: true})
  }
};
