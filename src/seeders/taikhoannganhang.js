'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('taikhoannganhang', [{
                thuyenvien_id: 1, // Giả sử id_thuyenvien = 1
                stk: '123456789012345',
                tentaikhoan: 'Nguyễn Văn A - Tài khoản 1',
            },
            {
                thuyenvien_id: 2, // Giả sử id_thuyenvien = 2
                stk: '987654321098765',
                tentaikhoan: 'Lê Thị B - Tài khoản 2',
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('taikhoannganhang', null, {});
    }
};