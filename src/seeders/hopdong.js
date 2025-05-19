'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('hopdong', [
            {
                thuyenvien_id: 1,
                hopdong_id: 101,
                ngayky: new Date('2024-01-15'),
                ngayhethan: new Date('2025-01-14'),
                trangthaihopdong: 'Đang hiệu lực',
                hinhanh: 'hopdong101.jpg',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                thuyenvien_id: 2,
                hopdong_id: 102,
                ngayky: new Date('2023-12-01'),
                ngayhethan: new Date('2024-11-30'),
                trangthaihopdong: 'Hết hạn',
                hinhanh: 'hopdong102.jpg',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('hopdong', null, {});
    }
};
