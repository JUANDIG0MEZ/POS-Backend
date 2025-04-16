const {cargarPagos} = require('../datosFaker')
const { Pago } = require('../models')
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const pagos = await cargarPagos()
    await Pago.bulkCreate(pagos, {
      individualHooks: true ,
      validate: true
    })
    //await queryInterface.bulkInsert('pagos', pagos, {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('pagos', null, {});
  }
};
