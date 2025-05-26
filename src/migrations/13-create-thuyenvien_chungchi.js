'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('thuyenvien_chungchi', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            id_thuyenvien: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'thuyenvien', // Tên bảng trong DB
                    key: 'id_thuyenvien'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            id_chungchi: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'chungchi', // Tên bảng trong DB
                    key: 'id_chungchi'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            sohieuchungchi: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            ngaycap: {
                type: Sequelize.DATE,
                allowNull: false
            },
            ngayhethan: {
                type: Sequelize.DATE,
                allowNull: false
            },
            noicap: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            xeploai: {
                type: Sequelize.STRING(30),
                allowNull: false
            },
            file: {
                type: Sequelize.STRING(255),
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
        await queryInterface.dropTable('thuyenvien_chungchi');
    }
};