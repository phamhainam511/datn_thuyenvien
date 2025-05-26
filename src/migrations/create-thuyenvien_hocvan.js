'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('thuyenvien_hocvan', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_thuyenvien: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: true,
        references: {
          model: 'thuyenvien',      // tên bảng thuyenvien phải đúng với DB
          key: 'id_thuyenvien',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',        // hoặc 'CASCADE' nếu muốn xóa khi thuyenvien bị xóa
      },
      truongdaotao: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      hedaotao: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      namtotnghiep: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('thuyenvien_hocvan');
  }
};