const {cargarDetallesCompra} = require('../datosFaker')
const { DetalleCompra } = require('../models')

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    const detallesCompras = cargarDetallesCompra()

    console.log("Detalles de Compra", detallesCompras.slice(0, 5))

    for (let i = 0; i < detallesCompras.length; i++){
      await DetalleCompra.create(detallesCompras[i], {
        individualHooks: true,
        validate: true,
        transaction
      })
    }
    await transaction.commit()
  },


};
