'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('AjusteInventario', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ajuste_id: {
        type: Sequelize.SMALLINT,
        allowNull: false
      },
      id_usuario: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        references: {
          model: 'Usuario',
          key: 'id'
        }
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
    await queryInterface.dropTable('AjusteInventaros')
  }
}
