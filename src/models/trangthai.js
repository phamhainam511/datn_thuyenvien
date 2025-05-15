'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Trangthai extends Model {
        static associate(models) {
            // Định nghĩa các quan hệ nếu cần thiết
        }
    }

    Trangthai.init({
        id_trangthai: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tentrangthai: {
            type: DataTypes.STRING(45),
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Trangthai',
        freezeTableName: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_0900_ai_ci',
        tableName: 'trangthai'
    });

    return Trangthai;
};
