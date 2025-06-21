'use strict'

const { VentaEstadoEntrega } = require('../models')
const { cargarEstadosEntregaVenta } = require('../datosFaker')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const estados = cargarEstadosEntregaVenta()

    const transaction = await queryInterface.sequelize.transaction()

    console.log('Estados de entrega de venta', estados.slice(0, 5))

    for (let i = 0; i < estados.length; i++) {
      await VentaEstadoEntrega.create(estados[i], {
        individualHooks: true,
        validate: true,
        transaction
      })
    }

    await transaction.commit()
  }

}
