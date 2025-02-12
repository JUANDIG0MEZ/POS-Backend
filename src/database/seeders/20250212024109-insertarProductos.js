const {faker} = require('@faker-js/faker')

function cargarProductos() {
    const productos = []
    for (let i = 0; i < 500; i++) {
        productos.push({
            id: i,
            nombre: faker.commerce.productName(),
            marca: faker.company.name(),
            categoria: faker.commerce.department(),
            medida: faker.helpers.arrayElement(['Kg', 'Unidad', 'Litro', 'Metro Cuadrado']),
            precioCompra: Math.ceil(faker.commerce.price({min: 10000, max: 50000})),
            precioVenta: Math.ceil(faker.commerce.price({min: 50000, max: 100000})),
            cantidad: faker.number.int({min: 1, max: 100}),
            total: faker.number.int({min: 100000000, max: 100000000000})
            })
    }
    return productos

};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const productos = cargarProductos()
    return await queryInterface.bulkInsert('Products', productos, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, { truncate: true})
  }
};
