const {cargarDetallesCompra} = require('../datosFaker')
const { DetalleCompra } = require('../models')

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    const detallesCompras = cargarDetallesCompra()

    for (let i = 0; i < detallesCompras.length; i++){
      await DetalleCompra.create(detallesCompras[i], {
        individualHooks: true,
        validate: true,
        transaction
      })
    }
    transaction.commit()
  },


  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('detalles_compras', null, {})
  }
};
