'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.TINYINT.UNSIGNED
      },
      nombre: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      contrasenia: {
        allowNull: false,
        type: Sequelize.STRING(250)

      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATEONLY
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Usuarios')
  }
}
