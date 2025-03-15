'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const estados = [
      {nombre: 'Entregado'},
      {nombre: 'Por entregar'}
    ]

    await queryInterface.bulkInsert('ventas_estados', estados, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ventas_estados', null, {});
  }
};
