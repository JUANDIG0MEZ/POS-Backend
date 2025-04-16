const {CompraEstado} = require('../models');
const {cargarEstadosCompra} = require('../datosFaker');
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const estados = cargarEstadosCompra()
    await CompraEstado.bulkCreate(estados, {
      individualHooks: true ,
      validate: true
    })
    //await queryInterface.bulkInsert('compras_estados', estados, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('compras_estados', null, {});
  }
};
