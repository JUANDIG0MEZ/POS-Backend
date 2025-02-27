const {cargarDetallesCompras} = require('../datosFaker')

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('detalles_compras', cargarDetallesCompras(),{})
  },


  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('detalles_compras', null, {})
  }
};
