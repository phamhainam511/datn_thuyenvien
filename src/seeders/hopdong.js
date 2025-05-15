'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('hopdong', [{
                tenhopdong: 'Hợp đồng ngắn hạn',
            },
            {
                tenhopdong: 'Hợp đồng dài hạn',
            },
            {
                tenhopdong: 'Hợp đồng thử việc',
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('hopdong', null, {});
    }
};