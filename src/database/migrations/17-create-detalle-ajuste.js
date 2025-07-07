'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('DetalleAjuste', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_ajuste: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'AjusteInventario',
          key: 'id'
        }
      },
      id_producto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Producto',
          key: 'id'
        }
      },
      cantidad_antes: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      cantidad_ahora: {
        type: Sequelize.INTEGER,
        allowNull: false
      }

    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('DetalleAjuste')
  }
}
