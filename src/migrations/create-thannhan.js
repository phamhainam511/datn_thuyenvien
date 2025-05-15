'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('thannhan', {
            id_thannhan: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
                autoIncrement: true 
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
            hotenbo: {
                type: Sequelize.STRING(45),
                allowNull: true
            },
            sdtbo: {
                type: Sequelize.STRING(11),
                allowNull: true
            },
            hotenme: {
                type: Sequelize.STRING(45),
                allowNull: true
            },
            sdtme: {
                type: Sequelize.STRING(11),
                allowNull: true
            },
            hotenvo: {
                type: Sequelize.STRING(45),
                allowNull: true
            },
            sdtvo: {
                type: Sequelize.STRING(11),
                allowNull: true
            },
            nguoigiamho: {
                type: Sequelize.STRING(45),
                allowNull: true
            },
            sdtgiamho: {
                type: Sequelize.STRING(11),
                allowNull: true
            },
            diachi: {
                type: Sequelize.STRING(100),
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
        await queryInterface.dropTable('thannhan');
    }
};