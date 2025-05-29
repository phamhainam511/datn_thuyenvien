'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('thuyenvien', [{
                anh: '',
                hoten: 'Pham Quang Hop',
                cccd: '012345678901',
                email: 'hop@gmail.com',
                sodienthoai: '0987654321',
                chieucao: 162,
                sizegiaybaoho: '39',
                cannang: 61,
                nhommau: 'A',
                sizegiay: 42,
                tinhtranghonnhan: 'Độc thân',
                trangthai:'Đang chờ tàu',
                ghichu:'',
                thoigian_lenTauDuKien:'',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('thuyenvien', null, {});
    }
};