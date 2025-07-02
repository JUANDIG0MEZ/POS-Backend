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
      id_usuario: {
        type: Sequelize.SMALLINT.UNSIGNED,
        allowNull: false,
        unique: true,
        references: {
          model: 'Usuario',
          key: 'id'
        }
      },
      nombre: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      nit: {
        type: Sequelize.STRING(9),
        allowNull: true
      },
      direccion: {
        type: Sequelize.STRING(120),
        allowNull: true
      },
      telefono: {
        type: Sequelize.STRING(20),
        allowNull: true
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Empresa')
  }
}
