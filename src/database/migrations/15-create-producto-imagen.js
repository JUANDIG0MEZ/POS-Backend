'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('ProductoImagen', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      usuario_id: {
        type: Sequelize.TINYINT.UNSIGNED,
        references: {
          model: 'Usuario',
          key: 'id'
        }
      },
      producto_id: {
        type: Sequelize.SMALLINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Producto',
          key: 'id'
        }
      },
      url_imagen: {
        type: Sequelize.STRING,
        allowNull: false
      }

    }
    )
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('ProductoImagen')
  }
}
