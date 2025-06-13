'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('ProductoCategoria', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.TINYINT.UNSIGNED
      },
      nombre: {
        type: Sequelize.STRING(200),
        allowNull: false,
        unique: true
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('ProductoCategoria')
  }
}
