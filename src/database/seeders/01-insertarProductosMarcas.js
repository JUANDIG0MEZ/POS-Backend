'use strict'

const { cargarMarcas } = require('../datosFaker')
const { ProductoMarca } = require('../models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const marcas = cargarMarcas()
    const transaction = await queryInterface.sequelize.transaction()
    console.log('Marcas', marcas.slice(0, 1))
    await ProductoMarca.bulkCreate(marcas, {
      individualHooks: true,
      validate: true,
      transaction
    })
    await transaction.commit()
  }
}
