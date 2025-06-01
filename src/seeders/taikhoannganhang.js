    'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('taikhoannganhang', [
      {
        thuyenvien_id: 1,
        stk: '012345678901234',
        tentaikhoan: 'Pham Quang Hop',
        tennganhang: 'Vietcombank',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        thuyenvien_id: 2,
        stk: '01239372937204',
        tentaikhoan: 'Mai Viet Viet',
        tennganhang: 'MBbank',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('taikhoannganhang', null, {});
  }
};
