'use strict'

const { medidas } = require('../datosFaker')
const { ProductoMedida } = require('../models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const medidasProduto = medidas()
    console.log('Medidas de producto', medidasProduto.slice(0, 1))
    const transaction = await queryInterface.sequelize.transaction()
    await ProductoMedida.bulkCreate(medidasProduto, {
      individualHooks: true,
      validate: true,
      transaction
    })
    await transaction.commit()
  }

}
