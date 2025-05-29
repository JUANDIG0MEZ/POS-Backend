const { cargarAbonos} = require('../datosFaker')
const {Abono} = require('../models')

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const abonos = await cargarAbonos()

    const transaction = await queryInterface.sequelize.transaction();

    for (let i =0; i < abonos.length; i++){
      await Abono.create(abonos[i], {
        individualHooks: true,
        validate: true,
        transaction
      })
    }
    
    await transaction.commit()
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Abono', null, {})
  }
};
