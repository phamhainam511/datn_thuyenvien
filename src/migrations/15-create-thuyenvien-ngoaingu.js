'use strict';

module.exports = {
 up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('thuyenvien_ngoaingu', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_thuyenvien: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'thuyenvien',       // Tên bảng thuyenvien trong database
          key: 'id_thuyenvien',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',       // Khi thuyenvien bị xóa, trường này được set NULL
      },
      ngonngu: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      tenchungchi: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      diemso: {
        type: Sequelize.FLOAT,
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
      },
      ngaycap: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      ngayhethan: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      file: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('thuyenvien_ngoaingu');
  }
};
