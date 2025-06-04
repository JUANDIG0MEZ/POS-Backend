const { cargarMetodosPagos } = require('../datosFaker')
const { MetodoPago } = require('../models')

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const metodosPago = cargarMetodosPagos();

    const transaction = await queryInterface.sequelize.transaction();

    for (let i=0; i< metodosPago.length; i++){
      await MetodoPago.create(metodosPago[i], {
        individualHooks: true,
        validate: true,
        transaction
      });
    }

    await transaction.commit();

  },

};
