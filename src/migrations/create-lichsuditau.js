'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('lichsuditau', {
            id_lichsuditau: {
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
            tau_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'tau', // Tên bảng trong DB
                    key: 'id_tau'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            timexuatcanh: {
                type: Sequelize.DATE,
                allowNull: false
            },
            timelentau: {
                type: Sequelize.DATE,
                allowNull: false
            },
            ngayroitau: {
                type: Sequelize.DATEONLY, // Sử dụng DATEONLY nếu chỉ cần lưu ngày
                allowNull: true
            },
            cangroitau: {
                type: Sequelize.STRING(50),
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
        await queryInterface.dropTable('lichsuditau');
    }
};

