'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('thuyenvien_chungchi', [{
                thuyenvien_id: 1, // Giả sử id_thuyenvien = 1
                chungchi_id: 2, // Giả sử id_chungchi = 2
                sohieuchungchi: 'CC12345',
                ngaycap: '2025-05-12 09:00:00',
                ngayhethan: '2028-05-12 09:00:00',
                noicap: 'Hải Phòng',
                hangbangcap: 'A',
            },
            {
                thuyenvien_id: 2, // Giả sử id_thuyenvien = 2
                chungchi_id: 3, // Giả sử id_chungchi = 3
                sohieuchungchi: 'CC67890',
                ngaycap: '2025-06-15 14:30:00',
                ngayhethan: '2028-06-15 14:30:00',
                noicap: 'Đà Nẵng',
                hangbangcap: 'B',
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('thuyenvien_chungchi', null, {});
    }
};