'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('AjusteInventario', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      ajuste_id: {
        type: Sequelize.SMALLINT.UNSIGNED,
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
      fecha: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      hora: {
        type: Sequelize.TIME,
        allowNull: false
      }
    })

    await queryInterface.addConstraint('AjusteInventario', {
      fields: ['ajuste_id', 'id_usuario'],
      type: 'unique',
      name: 'unque_ajuste_inventario_usuario'
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('AjusteInventario')
  }
}
