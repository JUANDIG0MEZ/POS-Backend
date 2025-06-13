'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Cliente', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.SMALLINT.UNSIGNED
      },
      nombre: {
        type: Sequelize.STRING(200),
        allowNull: false,
        unique: true
      },
      direccion: {
        type: Sequelize.STRING(150),
        allowNull: true
      },
      telefono: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      tipo_id: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        references: {
          model: 'ClienteTipo',
          key: 'id'
        }

      },
      por_pagarle: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        defaultValue: 0

      },
      debe: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0
        }
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Cliente')
  }
}
