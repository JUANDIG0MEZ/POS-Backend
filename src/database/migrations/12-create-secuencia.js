'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Secuencia', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.SMALLINT.UNSIGNED
      },
      usuario_id: {
        type: Sequelize.SMALLINT.UNSIGNED,
        references: {
          model: 'Usuario',
          key: 'id'
        }
      },
      tipo_documento_id: {
        type: Sequelize.TINYINT.UNSIGNED,
        references: {
          model: 'TipoDocumento',
          key: 'id'
        }
      },
      valor_actual: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Secuencia')
  }
}
