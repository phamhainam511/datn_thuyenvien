'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('chucvu', [{
                tenchucvu: 'Thuyền trưởng'
            },
            {
                tenchucvu: 'Sỹ quan boong'
            },
            {
                tenchucvu: 'Máy trưởng'
            },
            {
                tenchucvu: 'Thợ máy'
            },
            {
                tenchucvu: 'Thủy thủ'
            },
            {
                tenchucvu: 'Điện viên'
            },
            {
                tenchucvu: 'Bếp trưởng'
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('chucvu', null, {});
    }
};