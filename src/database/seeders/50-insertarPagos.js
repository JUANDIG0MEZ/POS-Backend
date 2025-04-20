const {cargarPagos} = require('../datosFaker')
const { Pago } = require('../models')
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const pagos = await cargarPagos()

    const transaction = await queryInterface.sequelize.transaction();

    for (let i =0; i < pagos.length; i++){
      await Pago.create(pagos[i], {
        individualHooks: true,
        validate: true,
        transaction
      })
    }

    transaction.commit()

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('pagos', null, {});
  }
};
