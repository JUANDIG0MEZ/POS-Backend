const { cargarFacturasVenta } = require('../datosFaker')
const { Venta} = require('../models')
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const facturas = cargarFacturasVenta()
    const transaction = await queryInterface.sequelize.transaction();

    for (let i =0; i < facturas.length; i++){
      await Venta.create(facturas[i], {
        individualHooks: true,
        validate: true,
        transaction
      })
    }

    transaction.commit()
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ventas', null, {})
  }
};
