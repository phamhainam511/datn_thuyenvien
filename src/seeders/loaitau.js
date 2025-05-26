'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const loaitaus = [
      'Tàu hàng',
      'Tàu gỗ',
      'Tàu công',
      'Tàu dầu (Oil Tanker)',
      'Tàu khí (Gas Tanker)',
      'Tàu hóa chất (Chemical Tanker)'
    ];

    const now = new Date();

    const data = loaitaus.map(tenloaitau => ({
      tenloaitau,
      createdAt: now,
      updatedAt: now
    }));

    await queryInterface.bulkInsert('loaitau', data);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('loaitau', null, {});
  }
};
