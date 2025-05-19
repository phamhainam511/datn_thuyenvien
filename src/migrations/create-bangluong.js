'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('bangluong', {
            id_bangluong: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
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
            luongcb: {
                type: Sequelize.DECIMAL(10, 0),
                allowNull: false
            },
            tigia: {
                type: Sequelize.DECIMAL(10, 0),
                allowNull: false
            },
            socong: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            thoigian: {
                type: Sequelize.DATEONLY,
                allowNull: false
            },
            phuongthuc: {
                type: Sequelize.STRING(45),
                allowNull: false
            },
            tinhtrang: {
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
        await queryInterface.dropTable('bangluong');
    }
};