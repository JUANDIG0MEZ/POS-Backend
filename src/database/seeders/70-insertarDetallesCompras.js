'use strict'

const { cargarDetallesCompra } = require('../datosFaker')
const { DetalleCompra } = require('../models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    const detallesCompras = cargarDetallesCompra()

    console.log('Detalles de Compra', detallesCompras.slice(0, 1))

    for (let i = 0; i < detallesCompras.length; i++) {
      console.log(detallesCompras[i])
      await DetalleCompra.create(detallesCompras[i], {
        individualHooks: true,
        validate: true,
        transaction
      })
    }
    await transaction.commit()
  }

}
