'use strict'

const { cargarProductos } = require('../datosFaker')
const { Producto } = require('../models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const productos = cargarProductos()

    const transaction = await queryInterface.sequelize.transaction()
    console.log('Productos', productos.slice(0, 1))
    for (let i = 0; i < productos.length; i++) {
      console.log(productos[i])
      await Producto.create(productos[i], {
        individualHooks: true,
        validate: true,
        transaction
      })
    }
    await transaction.commit()
  }

}
