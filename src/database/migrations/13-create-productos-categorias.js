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
      usuario_id: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Usuario',
          key: 'id'
        }
      },
      descripcion: {
        type: Sequelize.STRING(400),
        allowNull: false
      },

      nombre: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('ProductoCategoria')
  }
}
