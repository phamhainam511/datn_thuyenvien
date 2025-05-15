'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('thuyenvien_trangthai', [{
                thuyenvien_id: 1, // Giả sử id_thuyenvien = 1
                trangthai_id: 2, // Giả sử id_trangthai = 2
                thoigian: '2025-05-12',
            },
            {
                thuyenvien_id: 2, // Giả sử id_thuyenvien = 2
                trangthai_id: 3, // Giả sử id_trangthai = 3
                thoigian: '2025-06-15',
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('thuyenvien_trangthai', null, {});
    }
};