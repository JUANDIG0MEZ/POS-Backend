'use strict'

const { cargarAbonos } = require('../datosFaker')
const { Abono } = require('../models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const abonos = await cargarAbonos()

    const transaction = await queryInterface.sequelize.transaction()

    for (let i = 0; i < abonos.length; i++) {
      console.log(abonos[i])
      await Abono.create(abonos[i], {
        individualHooks: true,
        validate: true,
        transaction
      })
    }

    await transaction.commit()
  }

}
