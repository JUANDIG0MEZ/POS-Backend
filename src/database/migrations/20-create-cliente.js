'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('clientes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      direccion: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 0,
      },
      telefono: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 0,
      },
      tipo_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'clientes_tipos',
          key: 'id'
        }

      },
      por_pagarle: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0,

      },
      debe: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('clientes');
  }
};