'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('hopdong', [
      {
        thuyenvien_id: 1,
        ngayky: '2024-01-01 00:00:00',
        ngayhethan: '2025-01-01 00:00:00',
        ngaythanhly: null, // hoặc bạn có thể dùng '2025-01-02 00:00:00'
        trangthaihopdong: 'Hiệu lực',
        hinhanh: 'hopdong_1.pdf',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        thuyenvien_id: 2,
        ngayky: '2023-05-15 00:00:00',
        ngayhethan: '2024-05-15 00:00:00',
        ngaythanhly: '2024-05-16 00:00:00',
        trangthaihopdong: 'Đã thanh lý',
        hinhanh: 'hopdong_2.pdf',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('hopdong', null, {});
  }
};