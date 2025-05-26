'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [
      'Passport',
      'Seaman’s Book',
      'Cert of competency',
      'Basic training cert',
      'Adv fire fighting cert',
      'Medical first aid và Medical care cert',
      'Survival craft và Rescue boats cert',
      'Radar cert',
      'Arpa cert',
      'General Operator’s cert',
      'Endorserment of issua GOC cert',
      'Bridge team management',
      'Engine team management',
      'Electronic navigation system (ECDIS)',
      'Ship sercurity officer cert',
      'Ship sercurity awareness',
      'Ship Designated sercurity',
      'Health care',
      'Cholera cert',
      'Fever cert'
    ];

    const now = new Date();

    const records = data.map((tenchungchi, index) => ({
      tenchungchi,
      tieuchuanapdung: `Standard-${index + 1}`,
      createdAt: now,
      updatedAt: now
    }));

    await queryInterface.bulkInsert('chungchi', records);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('chungchi', null, {});
  }
};
