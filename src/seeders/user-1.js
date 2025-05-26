'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('user', [
      {
        taikhoan: 'admin01',
        matkhau: '123456', // có thể hash bằng bcrypt nếu cần
        phanquyen_id: 1,
        hoten: 'Nguyễn Quỳnh Anh',
        sdt: '0901234567',
        diachi: 'Hà Nội',
        email: 'admin01@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        taikhoan: 'user01',
        matkhau: 'userpass',
        phanquyen_id: 2,
        hoten: 'Trần Văn B',
        sdt: '0912345678',
        diachi: 'TP.HCM',
        email: 'user01@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        taikhoan: 'staff01',
        matkhau: 'staff123',
        phanquyen_id: 3,
        hoten: 'Lê Thị C',
        sdt: '0987654321',
        diachi: 'Đà Nẵng',
        email: 'staff01@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user', {
      taikhoan: ['admin01', 'user01', 'staff01']
    });
  }
};
