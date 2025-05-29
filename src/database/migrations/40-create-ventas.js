'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Venta', {
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
          model: 'Cliente',
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
        defaultValue: 0,
      },
      total: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0,
      },
      por_pagar: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0
      },
      estado_entrega_id: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        defaultValue: 1,
        references: {
          model: 'VentaEstadoEntrega',
          key: "id"
        }
      },
      estado_pago_id: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        defaultValue: true,
        references: {
          model: 'VentaEstadoPago',
          key: "id"
        }
      
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Venta');
  }
};