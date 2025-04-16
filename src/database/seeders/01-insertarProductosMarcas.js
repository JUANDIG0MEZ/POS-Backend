const { cargarMarcas} = require('../datosFaker')
'use strict';
const {ProductoMarca} = require('../models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const marcas = cargarMarcas()

    await ProductoMarca.bulkCreate(marcas, {
      individualHooks: true ,
      validate: true
    })
    //await queryInterface.bulkInsert('productos_marcas', marcas, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('productos_marcas', null, {})
  }
};
