
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const estados = [
      {nombre: 'Recibido'},
      {nombre: 'No recibido'}
    ]

    await queryInterface.bulkInsert('compras_estados', estados, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('compras_estados', null, {});
  }
};
