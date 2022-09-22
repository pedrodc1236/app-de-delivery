'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("sales", [
      {
        id: 1,
        user_id: 2,
        seller_id: 2,
        total_price: 170.50,
        delivery_address: 'rua dos doidos',
        delivery_number: "181",
        sale_date: '2022-09-21',
        status: 'em progresso',
      },
      {
        id: 2,
        user_id: 1,
        seller_id: 2,
        total_price: 99.30,
        delivery_address: 'rua dos lindoes',
        delivery_number: "222",
        sale_date: '2022-09-11',
        status: 'em progresso',
      },
      {
        id: 3,
        user_id: 3,
        seller_id: 2,
        total_price: 134.46,
        delivery_address: 'rua dos tristoes',
        delivery_number: "75",
        sale_date: '2022-09-20 13:40:00',
        status: 'em progresso',
      }
    ], {
      timestamps: false
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("sales", null, {});
  }
};