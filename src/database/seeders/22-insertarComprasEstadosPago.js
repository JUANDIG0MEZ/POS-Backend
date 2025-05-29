const { CompraEstadoPago } = require('../../models/index.js');
const { cargarEstadosPagoCompra } = require('../datosFaker/index.js');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const estados = cargarEstadosPagoCompra();

    const transaction = await queryInterface.sequelize.transaction();
    await CompraEstadoPago.bulkCreate(estados, {
      individualHooks: true,
      validate: true,
      transaction
    });
    await transaction.commit();
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CompraEstadoPago', null, {});
  }
};
