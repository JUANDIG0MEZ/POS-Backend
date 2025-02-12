'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING(350),
        allowNull: false
      },
      marca:{
        type: Sequelize.STRING(50),
        allowNull: true
      },
      categoria:{
        type: Sequelize.STRING(50),
        allowNull: true
      },
      medida:{
        type: Sequelize.STRING(50),
        allowNull: true
      },
      precioCompra:{
        type: Sequelize.BIGINT,
        allowNull: false,
        validate:{
          min: 0
        }
      },
      precioVenta:{
        type: Sequelize.BIGINT,
        allowNull: false,
        validate:{
          min: 0
        }
      },
      cantidad:{
        type: Sequelize.INTEGER,
        allowNull: false,
        validate:{
          min: 0
        }
      },
      total:{
        type: Sequelize.BIGINT,
        allowNull: false,
        validate:{
          min: 0
        }
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};