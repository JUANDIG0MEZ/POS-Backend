const {cargarDetallesCompra} = require('../datosFaker')
const { DetalleCompra } = require('../models')

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await DetalleCompra.bulkCreate(cargarDetallesCompra(), {
      individualHooks: true ,
      validate: true
    })
    //await queryInterface.bulkInsert('detalles_compras', cargarDetallesCompras(),{})
  },


  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('detalles_compras', null, {})
  }
};
