'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('NotaAjuste', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      tipo: {
        type: Sequelize.ENUM('credito', 'debito'),
        allowNull: false
      },
      motivo: {
        type: Sequelize.STRING(200)
      },
      total: {
        type: Sequelize.BIGINT.UNSIGNED
      },
      usuario_creador: {
        type: Sequelize.STRING(200)
      },
      fecha: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      hora: {
        type: Sequelize.TIME,
        allowNull: false
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('NotaAjuste')
  }
}
