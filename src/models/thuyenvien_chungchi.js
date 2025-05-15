'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ThuyenvienChungchi extends Model {
        static associate(models) {
            // Định nghĩa quan hệ với các bảng khác
            
        }
    }

    ThuyenvienChungchi.init({
        thuyenvien_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        chungchi_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        sohieuchungchi: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        ngaycap: {
            type: DataTypes.DATE,
            allowNull: false
        },
        ngayhethan: {
            type: DataTypes.DATE,
            allowNull: false
        },
        noicap: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        hangbangcap: {
            type: DataTypes.STRING(30),
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'ThuyenvienChungchi',
        freezeTableName: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_0900_ai_ci',
        tableName: 'thuyenvien_chungchi'
    });

    return ThuyenvienChungchi;
};
