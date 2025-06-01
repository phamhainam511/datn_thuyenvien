'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('hopdong', [
      {
        thuyenvien_id: 1,
        ngayky: '2022-01-01',
        ngayhethan: '2022-12-01',
        ngaythanhly: '2022-12-10', // hoặc bạn có thể dùng '2025-01-02 00:00:00'
        trangthaihopdong: 'Đã thanh lý',
        hinhanh: 'hopdong_1.pdf',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        thuyenvien_id: 1,
        ngayky: '2020-11-01',
        ngayhethan: '2021-09-30',
        ngaythanhly: '2021-10-1 ',
        trangthaihopdong: 'Đã thanh lý',
        hinhanh: 'hopdong_2.pdf',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        thuyenvien_id: 1,
        ngayky: '2020-11-01',
        ngayhethan: '2021-08-31',
        ngaythanhly: '2021-10-1 ',
        trangthaihopdong: 'Đã thanh lý',
        hinhanh: 'hopdong_2.pdf',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        thuyenvien_id: 3,
        ngayky: '2025-02-10',
        ngayhethan: '2025-10-31',
        ngaythanhly: null,
        trangthaihopdong: 'Có hiệu lực',
        hinhanh: 'hopdong_2.pdf',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('hopdong', null, {});
  }
};