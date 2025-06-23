'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Producto', {
      id: {
        type: Sequelize.SMALLINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      usuario_id: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Usuario',
          key: 'id'
        }
      },
      nombre: {
        type: Sequelize.STRING(300),
        allowNull: false
      },

      categoria_id: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: 1,
        references: {
          model: 'ProductoCategoria',
          key: 'id'
        }
      },
      medida_id: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'ProductoMedida',
          key: 'id'
        }
      },
      precio_compra: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0
      },
      precio_venta: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0
      },
      cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      total: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false
      }
    })

    await queryInterface.addConstraint('Producto', {
      fields: ['usuario_id', 'nombre'],
      type: 'unique',
      name: 'unique_usuario_producto'

    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Producto')
  }
}
