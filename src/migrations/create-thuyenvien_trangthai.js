'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('thuyenvien_trangthai', {
            thuyenvien_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'thuyenvien', // Tên bảng trong DB
                    key: 'id_thuyenvien'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            trangthai_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'trangthai', // Tên bảng trong DB
                    key: 'id_trangthai'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            thoigian: {
                type: Sequelize.DATEONLY,
                allowNull: true
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
        await queryInterface.dropTable('thuyenvien_trangthai');
    }
};