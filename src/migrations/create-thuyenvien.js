'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('thuyenvien', {
            id_thuyenvien: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            anh: {
                type: Sequelize.STRING(100),
                allowNull: true
            },
            hoten: {
                type: Sequelize.STRING(45),
                allowNull: false
            },
            cccd: {
                type: Sequelize.STRING(45),
                allowNull: false
            },
            email: {
                type: Sequelize.STRING(45),
                allowNull: false
            },
            sodienthoai: {
                type: Sequelize.STRING(45),
                allowNull: false
            },
            chieucao: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            cannang: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            nhommau: {
                type: Sequelize.STRING(5),
                allowNull: false
            },
            sizegiay: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            tinhtranghonnhan: {
                type: Sequelize.STRING(20),
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
            },
            ngaysinh: {
            type: Sequelize.DATE,
            allowNull: true
            }, 
            sizegiaybaoho: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            trangthai: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            ghichu: {
                type: Sequelize.STRING(255),
                allowNull: true
            },
            thoigian_lenTauDuKien: {
            type: Sequelize.DATE,
            allowNull: true
        }, 
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('thuyenvien');
    }
};