const {cargarClientes} = require('../datosFaker');
const {Cliente} = require('../models');
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const clientes = cargarClientes()
    await Cliente.bulkCreate(clientes, {
      individualHooks: true ,
      validate: true
    })
    //await queryInterface.bulkInsert('clientes', clientes, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('clientes', null, { truncate: true})
  }
};
