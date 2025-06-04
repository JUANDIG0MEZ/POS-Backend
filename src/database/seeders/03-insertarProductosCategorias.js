const {cargarCategorias} = require('../datosFaker')
const {ProductoCategoria} = require('../models')

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const categorias = cargarCategorias()
    const transaction = await queryInterface.sequelize.transaction()
    console.log("Categorias", categorias.slice(0, 1))
    await ProductoCategoria.bulkCreate(categorias, {
      individualHooks: true ,
      validate: true,
      transaction
    })
    await transaction.commit()
  },


};
