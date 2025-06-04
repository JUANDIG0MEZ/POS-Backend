const {cargarPagos} = require('../datosFaker')
const { Pago } = require('../models')

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const pagos = await cargarPagos()

    const transaction = await queryInterface.sequelize.transaction();

    console.log("Pagos", pagos.slice(0, 2))

    for (let i =0; i < pagos.length; i++){
      console.log("Pago: ", i)
      await Pago.create(pagos[i], {
        individualHooks: true,
        validate: true,
        transaction
      })
    }

    await transaction.commit()

  },

};
