const {cargarDetallesVenta} = require('../datosFaker');
const { DetalleVenta} = require('../models')
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await DetalleVenta.bulkCreate(cargarDetallesVenta(), {
      individualHooks: true ,
      validate: true
    })
    //await queryInterface.bulkInsert('detalles_ventas', cargarDetallesVentas(),{})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('detalles_ventas', null, {})
  }
};
