'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ventas', {
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
      cliente_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: {
          model: 'clientes',
          key: "id" 
        }
      },
      direccion: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Recogido en tienda',
      },
      pagado: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      total: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      estado_pago: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      por_pagar: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0
      },
      estado_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: {
          model: 'ventas_estados',
          key: "id"
        }
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ventas');
  }
};