'use strict'

const { cargarMedidas } = require('../datosFaker')
const { ProductoMedida } = require('../models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const medidas = cargarMedidas()
    const transaction = await queryInterface.sequelize.transaction()
    await ProductoMedida.bulkCreate(medidas, {
      individualHooks: true,
      validate: true,
      transaction
    })
    await transaction.commit()
  }

}
