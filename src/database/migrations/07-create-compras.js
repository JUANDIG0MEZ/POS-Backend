'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('compras', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fecha: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      hora: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      cliente: {
        type: Sequelize.STRING,
        allowNull: false
      },
      por_pagar: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0,
      },
      total: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'pendiente'
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('compras');
  }
};