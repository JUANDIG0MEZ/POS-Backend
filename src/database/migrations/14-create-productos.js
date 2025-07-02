'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Producto', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      id_usuario: {
        type: Sequelize.SMALLINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Usuario',
          key: 'id'
        }
      },
      producto_id: {
        type: Sequelize.SMALLINT.UNSIGNED,
        allowNull: false
      },
      nombre: {
        type: Sequelize.STRING(255),
        allowNull: false
      },

      id_categoria: {
        type: Sequelize.SMALLINT.UNSIGNED,
        allowNull: true,
        references: {
          model: 'ProductoCategoria',
          key: 'id'
        }
      },
      id_medida: {
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
      fields: ['id_usuario', 'nombre'],
      type: 'unique',
      name: 'unique_usuario_producto'

    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Producto')
  }
}
