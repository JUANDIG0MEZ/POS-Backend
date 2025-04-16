const { cargarProductos } = require('../datosFaker');
const {Producto} = require('../models')
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const productos = cargarProductos()
    await Producto.bulkCreate(productos, {
      individualHooks: true ,
      validate: true
    })
    //await queryInterface.bulkInsert('productos', productos, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('productos', null, { truncate: true})
  }
};
