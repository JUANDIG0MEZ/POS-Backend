const { VentaEstadoEntrega } = require('../models');
const { cargarEstadosEntregaVenta } = require('../datosFaker'); 

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const estados = cargarEstadosEntregaVenta()

    const transaction = await queryInterface.sequelize.transaction();

    for (let i =0; i < estados.length; i++){
      await VentaEstadoEntrega.create(estados[i], {
        individualHooks: true,
        validate: true,
        transaction
      })
    }

    await transaction.commit()
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('VentaEstadoEntrega', null, {});
  }
};
