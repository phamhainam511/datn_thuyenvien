'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('user', {
            taikhoan: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING(30)
            },
            matkhau: {
                type: Sequelize.STRING(30),
                allowNull: false
            },
            sdt: {
                type: Sequelize.STRING(15),
                allowNull: true
            },
            diachi: {
                type: Sequelize.STRING,
                allowNull: true
            },
            email: {
                type: Sequelize.STRING,
                allowNull: true
            },
            phanquyen_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'phanquyen',
                    key: 'id_phanquyen'
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT'
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
        await queryInterface.dropTable('user');
    }
};
