'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('lichsuditau', [
      {
        thuyenvien_id: 1,
        chucvu_id: 2, 
        tau_id: 1,  
        timexuatcanh: '2022-02-06 06:00:00',
        timelentau: '2022-03-06 08:00:00',
        ngayroitau: '2022-12-01 18:00:00',
        cangroitau: 'Hai Phong',
        quoctich_thuyen: 'Vietnam',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        thuyenvien_id: 1,
        chucvu_id: 3,
        tau_id: 2,
        timexuatcanh: '2020-11-06 07:00:00',
        timelentau: '2020-12-03 09:00:00',
        ngayroitau: '2021-08-31 16:00:00',
        cangroitau: 'Da Nang',
        quoctich_thuyen: 'Panama',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        thuyenvien_id: 1,
        chucvu_id: 3,
        tau_id: 3,
        timexuatcanh: '2025-01-01 05:00:00',
        timelentau: '2025-01-05 07:00:00',
        ngayroitau: '2025-05-01 17:00:00',
        cangroitau: 'Ho Chi Minh',
        quoctich_thuyen: 'Vietnam',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      //thuyen vien 2
      {
        thuyenvien_id: 2,
        chucvu_id: 7,
        tau_id: 2,
        timexuatcanh: '2025-03-01 05:00:00',
        timelentau: '2025-03-20 07:00:00',
        ngayroitau: '2025-05-20 17:00:00',
        cangroitau: 'Ho Chi Minh',
        quoctich_thuyen: 'Vietnam',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        thuyenvien_id: 2,
        chucvu_id: 8,
        tau_id: 3,
        timexuatcanh: '2023-02-01 05:00:00',
        timelentau: '2023-03-21 07:00:00',
        ngayroitau: '2024-01-17 17:00:00',
        cangroitau: 'Ho Chi Minh',
        quoctich_thuyen: 'Vietnam',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      //thuyen vien 3
      {
        thuyenvien_id: 3,
        chucvu_id: 10,
        tau_id: 1,
        timexuatcanh: '2022-05-10 05:00:00',
        timelentau: '2022-05-24 07:00:00',
        ngayroitau: '2023-09-27 17:00:00',
        cangroitau: 'Hai Phong',
        quoctich_thuyen: 'Vietnam',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        thuyenvien_id: 3,
        chucvu_id: 9,
        tau_id: 4,
        timexuatcanh: '2025-02-20 05:00:00',
        timelentau: '2025-03-19 07:00:00',
        ngayroitau: null,
        cangroitau: null,
        quoctich_thuyen: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('lichsuditau', null, {});
  }
};
