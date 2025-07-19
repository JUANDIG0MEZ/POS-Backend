'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Usuario', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.SMALLINT.UNSIGNED
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      },
      contrasenia: {
        allowNull: false,
        type: Sequelize.STRING(250)

      },
      expiracionCodigo: {
        type: Sequelize.DATE,
        allowNull: true
      },
      fechaCreado: {
        type: Sequelize.DATEONLY,
        allowNull: false
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Usuario')
  }
}
