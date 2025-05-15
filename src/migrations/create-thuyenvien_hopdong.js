'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('thuyenvien_hopdong', {
            id_thuyenvien_hopdong: {
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
            hopdong_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'hopdong', // Tên bảng trong DB
                    key: 'id_hopdong'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            ngayky: {
                type: Sequelize.DATE,
                allowNull: false
            },
            ngayhethan: {
                type: Sequelize.DATE,
                allowNull: false
            },
            trangthaihopdong: {
                type: Sequelize.STRING(45),
                allowNull: false
            },
            hinhanh: {
                type: Sequelize.STRING(100),
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
        await queryInterface.dropTable('thuyenvien_hopdong');
    }
};