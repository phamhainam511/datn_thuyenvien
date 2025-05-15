'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('bangluong', [{
                thuyenvien_id: 1, // Giả sử id_thuyenvien = 1
                luongcb: 15000000, // Lương cơ bản
                tigia: 23000, // Tỷ giá (VNĐ/USD)
                phuongthuc: 'Chuyển khoản',
                thoigian: '2025-05-01',
            },
            {
                thuyenvien_id: 2, // Giả sử id_thuyenvien = 2
                luongcb: 12000000,
                tigia: 23000,
                phuongthuc: 'Tiền mặt',
                thoigian: '2025-05-01',
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('bangluong', null, {});
    }
};