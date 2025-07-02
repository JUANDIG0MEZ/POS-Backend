'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('ProductoCategoria', {
      id: {
        type: Sequelize.SMALLINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      categoria_id: {
        type: Sequelize.TINYINT.UNSIGNED,
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
      fields: ['id_usuario', 'nombre'],
      type: 'unique',
      name: 'unique_usuario_categoria_nombre'

    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('ProductoCategoria')
  }
}
