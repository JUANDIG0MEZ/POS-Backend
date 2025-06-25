'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Empresa', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.SMALLINT.UNSIGNED
      },
      usuario_id: {
        type: Sequelize.SMALLINT.UNSIGNED,
        allowNull: false,
        unique: true,
        references: {
          model: 'Usuario',
          key: 'id'
        }
      },
      nombre: {
        type: Sequelize.STRING(200)
      },
      nit: {
        type: Sequelize.STRING(9)
      },
      direccion: {
        type: Sequelize.STRING(120)
      },
      telefono: {
        type: Sequelize.STRING(20)
      },
      createdAt: {
        type: Sequelize.DATEONLY,
        allowNull: false
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Empresa')
  }
}
