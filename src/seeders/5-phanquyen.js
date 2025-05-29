'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('phanquyen', [
            {
                tenphanquyen: 'Quản trị viên',
                mota: 'Quản lý toàn bộ hệ thống',
            },
            {
                tenphanquyen: 'Nhân viên nhân sự',
                mota: 'Sử dụng chức năng quản lý hồ sơ',
            },
            {
                tenphanquyen: 'Nhân viên kế toán',
                mota: 'Sử dụng chức năng quản lý lương',
            }
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('phanquyen', null, {});
    }
};
