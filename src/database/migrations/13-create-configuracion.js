'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Configuracion', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.SMALLINT.UNSIGNED
      },
      id_usuario: {
        type: Sequelize.SMALLINT.UNSIGNED,
        allowNull: false,
        references: {
          key: 'id',
          model: 'Usuario'
        }
      },
      decimalesCantidad: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: 2,
        validate: {
          max: 3
        }
      },
      decimalesPrecio: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: 2,
        validate: {
          max: 3
        }
      },
      decimalesTotal: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: 3,
        validate: {
          max: 3
        }
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Configuracion')
  }
}
