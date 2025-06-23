'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Abono', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      usuario_id: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Usuario',
          key: 'id'
        }
      },
      cliente_id: {
        type: Sequelize.SMALLINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Cliente',
          key: 'id'
        }
      },
      fecha: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },

      hora: {
        type: Sequelize.TIME,
        allowNull: false
      },
      valor: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false
      },
      metodo_pago_id: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'MetodoPago',
          key: 'id'
        }
      },
      descripcion: {
        type: Sequelize.STRING(200),
        allowNull: false
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Abono')
  }
}
