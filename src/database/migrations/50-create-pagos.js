'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Pago', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      pago_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
      },
      id_usuario: {
        type: Sequelize.SMALLINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Usuario',
          key: 'id'
        }
      },
      id_cliente: {
        type: Sequelize.INTEGER.UNSIGNED,
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
        type: Sequelize.DECIMAL(15, 3),
        allowNull: false
      },
      id_metodo_pago: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'MetodoPago',
          key: 'id'
        }
      },
      descripcion: {
        type: Sequelize.STRING(200),
        allowNull: true
      }
    })

    await queryInterface.addConstraint('Pago', {
      fields: ['id_usuario', 'pago_id'],
      type: 'unique',
      name: 'unique_usuario_pago_id'
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Pago')
  }
}
