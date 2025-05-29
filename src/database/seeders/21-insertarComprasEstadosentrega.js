const {CompraEstadoEntrega} = require('../models');
const {cargarEstadosEntregaCompra} = require('../datosFaker');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const estados = cargarEstadosEntregaCompra()

    const transaction = await queryInterface.sequelize.transaction();
    await CompraEstadoEntrega.bulkCreate(estados, {
      individualHooks: true ,
      validate: true,
      transaction
    })
    await transaction.commit()
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CompraEstadoEntrega', null, {});
  }
};
