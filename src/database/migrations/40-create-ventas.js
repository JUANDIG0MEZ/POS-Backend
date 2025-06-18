'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Venta', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      fecha: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      hora: {
        type: Sequelize.TIME,
        allowNull: false
      },
      cliente_id: {
        type: Sequelize.SMALLINT.UNSIGNED,
        allowNull: false,
        defaultValue: 1,
        references: {
          model: 'Cliente',
          key: 'id'
        }
      },
      pagado: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        defaultValue: 0
      },
      total: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        defaultValue: 0
      },
      por_pagar: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        defaultValue: 0
      },
      estado_entrega_id: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: 1,
        references: {
          model: 'VentaEstadoEntrega',
          key: 'id'
        }
      },
      estado_pago_id: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: true,
        references: {
          model: 'VentaEstadoPago',
          key: 'id'
        }

      },

      nombre_cliente: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      direccion: {
        type: Sequelize.STRING(200)
      }

    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Venta')
  }
}
