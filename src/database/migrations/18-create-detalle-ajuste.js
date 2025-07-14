'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('DetalleAjuste', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      id_ajuste: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'AjusteInventario',
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
      cantidad_antes: {
        type: Sequelize.DECIMAL(15, 3),
        allowNull: false
      },
      cantidad_ahora: {
        type: Sequelize.DECIMAL(15, 3),
        allowNull: false
      }

    })

    await queryInterface.addConstraint('DetalleAjuste', {
      fields: ['id_ajuste', 'id_producto'],
      type: 'unique',
      name: 'unique_detalle_ajuste_inventario'
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('DetalleAjuste')
  }
}
