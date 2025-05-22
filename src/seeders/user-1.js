'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('user', [
            {
                taikhoan: 'admin',
                hoten: 'Nguyễn Văn A',
                matkhau: '123456',
                sdt: '0909123456',
                diachi: '123 Lê Lợi, Quận 1',
                email: 'admin@example.com',
                phanquyen_id: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                taikhoan: 'nhanvien1',
                hoten: 'Trần Thị B',
                matkhau: '123456',
                sdt: '0987654321',
                diachi: '456 Hai Bà Trưng, Quận 3',
                email: 'nhanvien1@example.com',
                phanquyen_id: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('user', null, {});
    }
};
