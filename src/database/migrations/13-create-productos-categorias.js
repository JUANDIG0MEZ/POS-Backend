'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('ProductoCategoria', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.TINYINT.UNSIGNED
      },
      usuario_id: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Usuario',
          key: 'id'
        }
      },
      descripcion: {
        type: Sequelize.STRING(400),
        allowNull: false
      },

      nombre: {
        type: Sequelize.STRING(50),
        allowNull: false
      }
    })

    await queryInterface.addConstraint('ProductoCategoria', {
      fields: ['usuario_id', 'nombre'],
      type: 'unique',
      name: 'unique_usuario_categoria_nombre'

    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('ProductoCategoria')
  }
}
