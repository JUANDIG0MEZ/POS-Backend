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
      venta_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
      },
      id_usuario: {
        type: Sequelize.SMALLINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Usuario',
          key: 'id'
        }
      },
      id_cliente: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Cliente',
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
      },

      pagado: {
        type: Sequelize.DECIMAL(15, 3),
        allowNull: false,
        defaultValue: 0
      },
      total: {
        type: Sequelize.DECIMAL(15, 3),
        allowNull: false,
        defaultValue: 0
      },
      por_pagar: {
        type: Sequelize.DECIMAL(15, 3),
        allowNull: false,
        defaultValue: 0
      },
      id_estado_entrega: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: 1,
        references: {
          model: 'VentaEstadoEntrega',
          key: 'id'
        }
      },
      id_estado_pago: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: 1,
        references: {
          model: 'VentaEstadoPago',
          key: 'id'
        }
      },
      nombre_cliente: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      direccion: {
        type: Sequelize.STRING(120),
        allowNull: true
      },
      id_estado_factura: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: 1,
        references: {
          key: 'id',
          model: 'EstadoFactura'
        }
      }

    })
    await queryInterface.addConstraint('Venta', {
      fields: ['id_usuario', 'venta_id'],
      type: 'unique',
      name: 'unique_usuario_venta_id'
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Venta')
  }
}
