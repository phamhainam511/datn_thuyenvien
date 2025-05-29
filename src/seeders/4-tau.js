'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('tau', [
      {
        tentau: 'JAL KAMAL',
        quoctich: 'MARSHALL ISLANDS',
        loaitau_id: 1, // cập nhật đúng id_loaitau tương ứng
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tentau: 'GUO MAO 1',
        quoctich: 'Togo',
        loaitau_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tentau: 'AMIS INTEGRITY',
        quoctich: 'PANAMA',
        loaitau_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tentau: 'KAMARES',
        quoctich: 'PANAMA',
        loaitau_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tentau: 'SEACON OSAKA',
        quoctich: 'PANAMA',
        loaitau_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tentau: 'SEACON VICTORY',
        quoctich: 'PANAMA',
        loaitau_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tentau: 'FOREST 6',
        quoctich: 'HONG KONG',
        loaitau_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tentau: 'SEACON RIZHAO',
        quoctich: 'PANAMA',
        loaitau_id: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tentau: 'SKY HEIGHT',
        quoctich: 'PANAMA',
        loaitau_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tentau: 'SCO SHANGHAI',
        quoctich: 'MARSHALL ISLANDS',
        loaitau_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('tau', null, {});
  }
};
