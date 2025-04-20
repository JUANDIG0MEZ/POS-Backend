const { cargarMarcas} = require('../datosFaker'); 
const {ProductoMarca} = require('../models');

'use strict';



/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const marcas = cargarMarcas()
    const transaction = await queryInterface.sequelize.transaction()
    await ProductoMarca.bulkCreate(marcas, {
      individualHooks: true ,
      validate: true,
      transaction
    })
    await transaction.commit()
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('productos_marcas', null, {})
  }
};
