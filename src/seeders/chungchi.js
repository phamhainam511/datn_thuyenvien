'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('chungchi', [{
                tenchungchi: 'Chứng chỉ An toàn',
                tieuchuanapdung: 'ISO 9001',
            },
            {
                tenchungchi: 'Chứng chỉ Hàng hải',
                tieuchuanapdung: 'SOLAS',
            },
            {
                tenchungchi: 'Chứng chỉ Y tế',
                tieuchuanapdung: 'WHO',
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('chungchi', null, {});
    }
};