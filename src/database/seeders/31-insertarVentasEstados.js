const { VentaEstado } = require('../models');
const { cargarEstadosVenta } = require('../datosFaker'); 
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const estados = cargarEstadosVenta()
    await VentaEstado.bulkCreate(estados, {
      individualHooks: true ,
      validate: true
    })
    //await queryInterface.bulkInsert('ventas_estados', estados, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ventas_estados', null, {});
  }
};
