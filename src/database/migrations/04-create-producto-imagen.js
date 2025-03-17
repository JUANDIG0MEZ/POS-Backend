'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('productos_imagenes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      producto_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'productos',
          key: 'id'
        }
      },
      imagen: {
        type: Sequelize.BLOB('medium'),
        allowNull: false,
      }

      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('productos_imagenes');
  }
};