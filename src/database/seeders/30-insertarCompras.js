const {cargarFacturasCompra} = require('../datosFaker')
const {Compra} = require('../models')
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const facturas = cargarFacturasCompra()
    await Compra.bulkCreate(facturas, {
      individualHooks: true ,
      validate: true
    })
    //await queryInterface.bulkInsert('compras', facturas, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('compras', null, {})
  }
};
