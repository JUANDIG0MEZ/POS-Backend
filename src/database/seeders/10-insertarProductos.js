const { cargarProductos } = require('../datosFaker');
const {Producto} = require('../models')

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const productos = cargarProductos()
    
    const transaction = await queryInterface.sequelize.transaction();
    await Producto.bulkCreate(productos, {
      individualHooks: true ,
      validate: true,
      transaction
    })
    await transaction.commit()
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Producto', null, { truncate: true})
  }
};
