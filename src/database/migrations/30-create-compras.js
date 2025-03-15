'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('compras', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fecha: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      hora: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      cliente_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: {
          model: 'clientes',
          key: "id"
        }
      },
      pagado: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0,
      },
      total: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      estado_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'compras_estados',
          key: "id"
        }
      },
    });

    // Se agrega una restriccion para que pagado siempre sea menor o igual a total
    await queryInterface.addConstraint('compras',{
      fields : ['pagado', 'total'],
      type: 'check',
      name: 'pagado_menor_o_igual_total',
      where: {
        pagado: { [Sequelize.Op.lte]: Sequelize.col('total') }
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('compras');
  }
};