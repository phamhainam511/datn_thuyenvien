'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('thuyenvien_hocvan', [
      {
        id_thuyenvien: 1,
        truongdaotao: 'Trường Đại học Hàng hải Việt Nam',
        hedaotao: 'Đại học',
        namtotnghiep: 2008,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('thuyenvien_hocvan', null, {});
  }
};
