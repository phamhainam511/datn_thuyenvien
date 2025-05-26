'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('thuyenvien_tailieu', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_thuyenvien: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'thuyenvien',   // tên bảng thuyenvien trong DB
          key: 'id_thuyenvien',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'   // hoặc 'CASCADE' tùy theo yêu cầu nghiệp vụ
      },
      cccd_mattruoc: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      cccd_matsau: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      phieutiemvacxin: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      chungnhanvangda: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('thuyenvien_tailieu');
  }
};
