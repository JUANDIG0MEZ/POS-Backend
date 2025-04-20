'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('detalles_ventas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      venta_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ventas',
          key: 'id'
        }
      },
      producto_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'productos',
          key: 'id'
        }
      },
      cantidad: {
        type: Sequelize.DECIMAL(10, 0),
        allowNull: false,
        validate: {
          min: 1
        }
      },
      precio: {
        type: Sequelize.DECIMAL(10, 0),
        allowNull: false
      },
      subtotal: {
        type: Sequelize.DECIMAL(12, 0),
        allowNull: false
      }
      
    });

    await queryInterface.addConstraint('detalles_ventas', {
      fields: ['venta_id', 'producto_id'],
      type: 'unique',
      name: 'unique_venta_producto'
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('detalles_ventas');
  }
};