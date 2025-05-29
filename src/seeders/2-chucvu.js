'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const chucvus = [
      'Thuyền trưởng',
      'Đại phó',
      'Phó 2',
      'Phó 3',
      'Thủy thủ trưởng',
      'Thủy thủ',
      'Thợ máy boong',
      'Sỹ quan máy',
      'Thợ máy',
      'No1 CLR',
      'Đầu bếp trưởng',
      'Phụ bếp',
      'Điện trưởng',
      'Thợ điện'
    ];

    const now = new Date();

    const data = chucvus.map(tenchucvu => ({
      tenchucvu,
      createdAt: now,
      updatedAt: now
    }));

    await queryInterface.bulkInsert('chucvu', data);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('chucvu', null, {});
  }
};
