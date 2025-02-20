const {cargarCategorias} = require('../datosFaker')
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const categorias = cargarCategorias()
    await queryInterface.bulkInsert('productos_categorias', categorias, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('productos_categorias', null, {})
  }
};
