const {CompraEstadoEntrega} = require('../models');
const {cargarEstadosEntregaCompra} = require('../datosFaker');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const estados = cargarEstadosEntregaCompra()

    const transaction = await queryInterface.sequelize.transaction();
    console.log("Estados de entrega de compra", estados.slice(0, 5))
    await CompraEstadoEntrega.bulkCreate(estados, {
      individualHooks: true ,
      validate: true,
      transaction
    })
    await transaction.commit()
  },


};
