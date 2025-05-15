'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('trangthai', [{
                tentrangthai: 'Đang hoạt động',
            },
            {
                tentrangthai: 'Ngừng hoạt động',
            },
            {
                tentrangthai: 'Tạm thời khóa',
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('trangthai', null, {});
    }
};