const {cargarDetallesVenta} = require('../datosFaker');
const { DetalleVenta} = require('../models')
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    const detallesVentas = cargarDetallesVenta()

    for (let i =0; i < detallesVentas.length; i++){
      await DetalleVenta.create(detallesVentas[i], {
        individualHooks: true,
        validate: true,
        transaction
      })
    }

    transaction.commit()
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('detalles_ventas', null, {})
  }
};
