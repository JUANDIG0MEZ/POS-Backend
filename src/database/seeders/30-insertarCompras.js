const {cargarFacturasCompra} = require('../datosFaker')
const {Compra} = require('../models')

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const facturas = cargarFacturasCompra()

    const transaction = await queryInterface.sequelize.transaction();

    for (let i =0; i < facturas.length; i++){
      await Compra.create(facturas[i], {
        individualHooks: true,
        validate: true,
        transaction,
        
      })
    }

    await transaction.commit()
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Compra', null, {})
  }
};
