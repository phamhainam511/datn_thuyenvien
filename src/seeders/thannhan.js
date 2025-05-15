module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('thannhan', [{
                thuyenvien_id: 1,
                hotenbo: 'Nguyễn Văn A',
                sdtbo: '0123456789',
                hotenme: 'Trần Thị B',
                sdtme: '0987654321',
                hotenvo: 'Lê Thị C',
                sdtvo: '0912345678',
                nguoigiamho: 'Nguyễn Thị D',
                sdtgiamho: '0912341234',
                diachi: 'Hà Nội',
            },
            {
                thuyenvien_id: 2,
                hotenbo: 'Nguyễn Văn E',
                sdtbo: '0123456789',
                hotenme: 'Trần Thị F',
                sdtme: '0987654321',
                hotenvo: 'Lê Thị G',
                sdtvo: '0912345678',
                nguoigiamho: 'Nguyễn Thị H',
                sdtgiamho: '0912341234',
                diachi: 'TP.HCM',
            }
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('thannhan', null, {});
    }
};