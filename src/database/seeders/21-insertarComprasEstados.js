const {CompraEstado} = require('../models');
const {cargarEstadosCompra} = require('../datosFaker');
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const estados = cargarEstadosCompra()

    const transaction = await queryInterface.sequelize.transaction();
    await CompraEstado.bulkCreate(estados, {
      individualHooks: true ,
      validate: true,
      transaction
    })
    transaction.commit()
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('compras_estados', null, {});
  }
};
