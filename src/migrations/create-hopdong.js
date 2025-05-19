'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('hopdong', {
            id_hopdong: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            thuyenvien_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            hopdong_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            ngayky: {
                type: Sequelize.DATE,
                allowNull: false
            },
            ngayhethan: {
                type: Sequelize.DATE,
                allowNull: false
            },
            ngaythanhly: {
                type: Sequelize.DATE,
                allowNull: true
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

        // Foreign key
        await queryInterface.addConstraint('hopdong', {
            fields: ['thuyenvien_id'],
            type: 'foreign key',
            name: 'tvhd_thuyenvien',
            references: {
                table: 'thuyenvien',
                field: 'id_thuyenvien'
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT'
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('hopdong');
    }
};
