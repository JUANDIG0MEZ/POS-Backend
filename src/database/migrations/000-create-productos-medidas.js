'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('ProductoMedida', {
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
      categoria: {
        type: Sequelize.STRING(50),
        allowNull: false
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('ProductoMedida')
  }
}
