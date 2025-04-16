const { cargarAbonos} = require('../datosFaker')
const {Abono} = require('../models')
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const abonos = await cargarAbonos()
    await Abono.bulkCreate(abonos, {
      individualHooks: true ,
      validate: true
    })
    //await queryInterface.bulkInsert('abonos', abonos, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('abonos', null, {})
  }
};
