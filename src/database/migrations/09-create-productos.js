'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('productos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      marca_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'productos_marcas',
          key: 'id'
        }
      },
      categoria_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'productos_categorias',
          key: 'id'
        }
      },
      medida_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'productos_medidas',
          key: 'id'
        }
      },
      precio_compra: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0,
      },
      precio_venta: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0,

      },
      cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      total: {
        type: Sequelize.BIGINT,
        allowNull: false,
      }
    });

    await queryInterface.addConstraint('productos', {
      fields: ['nombre', 'marca_id'],
      type: 'unique',
      name: 'unique_nombre_marca'
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('productos');
  }
};