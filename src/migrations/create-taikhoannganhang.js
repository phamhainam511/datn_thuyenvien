'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('taikhoannganhang', {
            thuyenvien_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'thuyenvien', // Tên bảng trong DB
                    key: 'id_thuyenvien'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            stk: {
                type: Sequelize.STRING(15),
                allowNull: false
            },
            tentaikhoan: {
                type: Sequelize.STRING(45),
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('taikhoannganhang');
    }
};