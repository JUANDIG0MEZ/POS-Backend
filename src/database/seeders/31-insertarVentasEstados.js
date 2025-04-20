const { VentaEstado } = require('../models');
const { cargarEstadosVenta } = require('../datosFaker'); 
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const estados = cargarEstadosVenta()

    const transaction = await queryInterface.sequelize.transaction();

    for (let i =0; i < estados.length; i++){
      await VentaEstado.create(estados[i], {
        individualHooks: true,
        validate: true,
        transaction
      })
    }

    transaction.commit()
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ventas_estados', null, {});
  }
};
