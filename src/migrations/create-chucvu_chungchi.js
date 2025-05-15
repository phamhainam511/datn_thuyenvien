'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('chucvu_chungchi', {
            id_chungchi_chucvu: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            chucvu_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'chucvu', // Tên bảng trong DB
                    key: 'id_chucvu'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            chungchi_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'chungchi', // Tên bảng trong DB
                    key: 'id_chungchi'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
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
        await queryInterface.dropTable('chucvu_chungchi');
    }
};