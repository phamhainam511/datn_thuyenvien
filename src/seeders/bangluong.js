'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('bangluong', [
      {
        thuyenvien_id: 1,
        luongcb: 1000,
        tigia: 24000,
        socong: 26,
        thoigian: '2025-02-01',
        tongtien: 10000000,
        phuongthuc: 'Ngày xuất cảnh',
        tinhtrang: 'Đã thanh toán',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        thuyenvien_id: 2,
        luongcb: 1200,
        tigia: 23500,
        socong: 25,
        thoigian: '2025-04-01',
        tongtien: 12000000,
        phuongthuc: 'Ngày lên tàu',
        tinhtrang: 'Chưa thanh toán',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('bangluong', null, {});
  }
};
