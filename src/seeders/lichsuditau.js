'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('lichsuditau', [{
                thuyenvien_id: 1, // Giả sử id_thuyenvien = 1
                chucvu_id: 2, // Giả sử id_chucvu = 2
                tau_id: 3, // Giả sử id_tau = 3
                timexuatcanh: '2025-05-12 10:00:00',
                timelentau: '2025-05-12 12:00:00',
                ngayroitau: '2025-05-13',
                cangroitau: 'Cảng Hải Phòng',
            },
            {
                thuyenvien_id: 2, // Giả sử id_thuyenvien = 2
                chucvu_id: 3, // Giả sử id_chucvu = 3
                tau_id: 1, // Giả sử id_tau = 4
                timexuatcanh: '2025-05-14 09:00:00',
                timelentau: '2025-05-14 11:00:00',
                ngayroitau: '2025-05-15',
                cangroitau: 'Cảng Đà Nẵng',
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('lichsuditau', null, {});
    }
};