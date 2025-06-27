'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Secuencia', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.SMALLINT.UNSIGNED
      },
      usuario_id: {
        type: Sequelize.SMALLINT.UNSIGNED,
        references: {
          model: 'Usuario',
          key: 'id'
        }
      },
      producto_id: {
        type: Sequelize.SMALLINT.UNSIGNED,
        allowNull: false,
        defaultValue: 1
      },
      categoria_id: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: 1
      },
      cliente_id: {
        type: Sequelize.SMALLINT.UNSIGNED,
        allowNull: false,
        defaultValue: 1
      },
      compra_id: {
        type: Sequelize.SMALLINT.UNSIGNED,
        allowNull: false,
        defaultValue: 1
      },
      venta_id: {
        type: Sequelize.SMALLINT.UNSIGNED,
        allowNull: false,
        defaultValue: 1
      },
      pago_id: {
        type: Sequelize.SMALLINT.UNSIGNED,
        allowNull: false,
        defaultValue: 1
      },
      abono_id: {
        type: Sequelize.SMALLINT.UNSIGNED,
        allowNull: false,
        defaultValue: 1
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Secuencia')
  }
}
