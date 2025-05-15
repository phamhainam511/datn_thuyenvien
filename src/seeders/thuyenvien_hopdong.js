'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('thuyenvien_hopdong', [{
                thuyenvien_id: 1, // Giả sử id_thuyenvien = 1
                hopdong_id: 2, // Giả sử id_hopdong = 2
                ngayky: '2025-05-12 09:00:00',
                ngayhethan: '2028-05-12 09:00:00',
                trangthaihopdong: 'Đang hoạt động',
                hinhanh: 'contract_image_1.jpg',
            },
            {
                thuyenvien_id: 2, // Giả sử id_thuyenvien = 2
                hopdong_id: 3, // Giả sử id_hopdong = 3
                ngayky: '2025-06-15 14:30:00',
                ngayhethan: '2028-06-15 14:30:00',
                trangthaihopdong: 'Đã hết hạn',
                hinhanh: 'contract_image_2.jpg',
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('thuyenvien_hopdong', null, {});
    }
};