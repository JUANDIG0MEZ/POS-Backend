const { cargarFacturasVenta } = require('../datosFaker')
const { Venta} = require('../models')
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const facturas = cargarFacturasVenta()
    await Venta.bulkCreate(facturas, {
      individualHooks: true ,
      validate: true
    })
    //await queryInterface.bulkInsert('ventas', facturas, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ventas', null, {})
  }
};
