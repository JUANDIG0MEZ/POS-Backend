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
      id_venta: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Venta',
          key: 'id'
        }
      },
      id_producto: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Producto',
          key: 'id'
        }
      },
      cantidad: {
        type: Sequelize.DECIMAL(15, 3),
        allowNull: false,
        validate: {
          min: 0
        }
      },
      precio: {
        type: Sequelize.DECIMAL(15, 3),
        allowNull: false
      },
      subtotal: {
        type: Sequelize.DECIMAL(15, 3),
        allowNull: false
      },
      isAnulada: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }

    })

    await queryInterface.addConstraint('DetalleVenta', {
      fields: ['id_venta', 'id_producto'],
      type: 'unique',
      name: 'unique_venta_producto'
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('DetalleVenta')
  }
}
