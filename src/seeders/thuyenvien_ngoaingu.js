    'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('thuyenvien_ngoaingu', [
      {
        id_thuyenvien: 1,
        ngonngu: 'Tieng Anh',
        tenchungchi: 'Toeic',
        diemso: 855,
        ngaycap: new Date('2022-05-01'),
        ngayhethan: new Date('2027-05-01'),
        file: 'chungchi_1.pdf',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('thuyenvien_ngoaingu', null, {});
  }
};
