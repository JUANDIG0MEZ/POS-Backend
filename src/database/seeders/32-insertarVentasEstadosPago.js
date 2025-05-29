const { VentaEstadoPago} = require('../../models/index.js');
const { cargarEstadosPagoVenta} = require('../datosFaker/index.js');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const estados = cargarEstadosPagoVenta();

    const transaction = await queryInterface.sequelize.transaction();

    await VentaEstadoPago.bulkCreate(estados, {
      individualHooks: true,
      validate: true,
      transaction
    });

    await transaction.commit();
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('VentaEstadoPago', null, {});
  }
};
