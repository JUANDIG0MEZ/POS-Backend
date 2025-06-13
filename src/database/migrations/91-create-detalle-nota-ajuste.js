'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('DetalleNotaAjuste', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nota_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'NotaAjuste',
          key: 'id'
        }
      },
      producto_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Producto',
          key: 'id'
        }
      },
      cantidad: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      precio_unitario: {
        type: Sequelize.DECIMAL(12, 2)
      },
      fecha: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      hora: {
        type: Sequelize.TIME,
        allowNull: false
      }

    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('DetalleNotaAjuste')
  }
}
