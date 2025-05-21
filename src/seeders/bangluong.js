'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('bangluong', [{
            thuyenvien_id: 1, // Giả sử id_thuyenvien = 1
            luongcb: 1500, // Lương cơ bản
            tigia: 23000, // Tỷ giá (VNĐ/USD)
            socong: 23,
            thoigian: '2025-05-01',
            tongtien: 150000000,
            phuongthuc: 'Ngày xuất cảnh',
            tinhtrang: 'Chưa thanh toán',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            thuyenvien_id: 2, // Giả sử id_thuyenvien = 2
            luongcb: 1200,
            tigia: 23000,
            socong: 24,
            thoigian: '2025-04-01',
            tongtien: 30000000,
            phuongthuc: 'Ngày lên tàu',
            tinhtrang: 'Đã thanh toán',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            thuyenvien_id: 1, // Giả sử id_thuyenvien = 2
            luongcb: 1000,
            tigia: 23000,
            socong: 25,
            thoigian: '2025-04-09',
            tongtien: 20000000,
            phuongthuc: 'Ngày lên tàu',
            tinhtrang: 'Đã thanh toán',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            thuyenvien_id: 2, // Giả sử id_thuyenvien = 2
            luongcb: 1100,
            tigia: 23000,
            socong: 25,
            thoigian: '2024-12-09',
            tongtien: 40000000,
            phuongthuc: 'Ngày xuất cảnh',
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