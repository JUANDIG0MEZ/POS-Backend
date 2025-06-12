'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('NotaAjuste', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tipo: {
        type: Sequelize.ENUM('credito', 'debito'),
        allowNull: false
      },
      categoria_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'CategoriaNotaCredito',
          key: 'id'
        }
      },
      motivo: {
        type: Sequelize.STRING
      },
      total: {
        type: Sequelize.INTEGER
      },
      usuario_creador: {
        type: Sequelize.STRING
      },
      fecha: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      hora: {
        type: Sequelize.TIME,
        allowNull: false
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('NotaAjuste')
  }
}
