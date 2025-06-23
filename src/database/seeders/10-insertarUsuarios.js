'use strict'

const { cargarUsuarios } = require('../datosFaker')
const { Usuario } = require('../models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const usuarios = await cargarUsuarios()
    const transaction = await queryInterface.sequelize.transaction()

    for (let i = 0; i < usuarios.length; i++) {
      await Usuario.create(usuarios[i], {
        individualHooks: true,
        validate: true,
        transaction
      })
    }

    console.log(usuarios)

    await transaction.commit()
  }

}
