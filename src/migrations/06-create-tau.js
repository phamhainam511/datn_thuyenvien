'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('tau', {
            id_tau: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            tentau: {
                type: Sequelize.STRING(45),
                allowNull: false
            },
            quoctich: {
                type: Sequelize.STRING(30),
                allowNull: false
            },
            loaitau_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'loaitau',
                    key: 'id_loaitau'
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
        await queryInterface.dropTable('tau');
    }
};