'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pago', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cliente_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Cliente',
          key: 'id'
        }
      },
      fecha: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      hora: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      valor: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      metodo_pago_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'MetodoPago',
          key: 'id'
        }
      },
      descripcion: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Pago');
  }
};