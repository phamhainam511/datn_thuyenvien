'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('thuyenvien', [{
                anh: 'anh1.jpg',
                hoten: 'Nguyễn Văn A',
                cccd: '012345678901',
                email: 'vana@example.com',
                sodienthoai: '0987654321',
                chieucao: 170,
                cannang: 65.5,
                nhommau: 'O',
                sizegiay: 42,
                tinhtranghonnhan: 'Độc thân',
            },
            {
                anh: 'anh2.jpg',
                hoten: 'Trần Thị B',
                cccd: '012345678902',
                email: 'thib@example.com',
                sodienthoai: '0912345678',
                chieucao: 160,
                cannang: 50,
                nhommau: 'A',
                sizegiay: 38,
                tinhtranghonnhan: 'Đã kết hôn',
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('thuyenvien', null, {});
    }
};