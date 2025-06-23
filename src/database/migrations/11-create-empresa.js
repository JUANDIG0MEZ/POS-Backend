'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Empresas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.TINYINT.UNSIGNED
      },
      usuario_id: {
        type: Sequelize.TINYINT.UNSIGNED,
        unique: true,
        references: {
          model: 'Usuario',
          key: 'id'
        }
      },
      nombre: {
        type: Sequelize.STRING
      },
      nit: {
        type: Sequelize.STRING
      },
      direccion: {
        type: Sequelize.STRING
      },
      telefono: {
        type: Sequelize.STRING(20)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATEONLY
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Empresas')
  }
}
