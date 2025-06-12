'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Abono', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fecha: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      cliente_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Cliente',
          key: 'id'
        }
      },
      hora: {
        type: Sequelize.TIME,
        allowNull: false
      },
      valor: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      metodo_pago_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'MetodoPago',
          key: 'id'
        }
      },
      descripcion: {
        type: Sequelize.STRING,
        allowNull: false
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Abono')
  }
}
