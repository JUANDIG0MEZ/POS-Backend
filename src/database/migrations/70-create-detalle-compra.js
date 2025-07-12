'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('DetalleCompra', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      id_compra: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Compra',
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

    await queryInterface.addConstraint('DetalleCompra', {
      fields: ['id_compra', 'id_producto'],
      type: 'unique',
      name: 'unique_compra_producto'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('DetalleCompra')
  }
}
