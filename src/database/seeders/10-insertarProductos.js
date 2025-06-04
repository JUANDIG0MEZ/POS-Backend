const { cargarProductos } = require('../datosFaker');
const {Producto} = require('../models')

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const productos = cargarProductos()
    
    const transaction = await queryInterface.sequelize.transaction();
    console.log("Productos", productos.slice(0, 5))
    await Producto.bulkCreate(productos, {
      individualHooks: true ,
      validate: true,
      transaction
    })
    await transaction.commit()
  },

};
