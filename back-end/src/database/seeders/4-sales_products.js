'use strict';

module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert("sales_products", [
      {
        sale_id: 1,
        product_id: 6,
        quantity: 40,
      },
      {
        sale_id: 2,
        product_id: 4,
        quantity: 3,
      },
      {
        sale_id: 3,
        product_id: 5,
        quantity: 34,
      }
    ], {
      timestamps: false,
    });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("sales_products", null, {});
  }
};