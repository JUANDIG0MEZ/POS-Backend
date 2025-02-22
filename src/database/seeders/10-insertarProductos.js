const { cargarProductos } = require('../datosFaker');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const productos = cargarProductos()
    await queryInterface.bulkInsert('productos', productos, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('productos', null, { truncate: true})
  }
};
