'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('DetalleVenta', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      usuario_id: {
        type: Sequelize.TINYINT.UNSIGNED,
        references: {
          model: 'Usuario',
          key: 'id'
        }
      },
      venta_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Venta',
          key: 'id'
        }
      },

      producto_id: {
        type: Sequelize.SMALLINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Producto',
          key: 'id'
        }
      },
      cantidad: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        validate: {
          min: 0
        }
      },
      precio: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
      },
      subtotal: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false
      }

    })

    await queryInterface.addConstraint('DetalleVenta', {
      fields: ['venta_id', 'producto_id'],
      type: 'unique',
      name: 'unique_venta_producto'
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('DetalleVenta')
  }
}
