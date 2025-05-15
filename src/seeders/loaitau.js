'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('loaitau', [{
                tenloaitau: 'Tàu hàng',
            },
            {
                tenloaitau: 'Tàu dầu',
            },
            {
                tenloaitau: 'Tàu công',
            },
            {
                tenloaitau: 'Tàu hóa chất',
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('loaitau', null, {});
    }
};