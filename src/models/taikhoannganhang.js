'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Taikhoannganhang extends Model {
        static associate(models) {
            // Định nghĩa quan hệ với bảng thuyenvien
            
        }
    }

    Taikhoannganhang.init({
        thuyenvien_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        stk: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
        tentaikhoan: {
            type: DataTypes.STRING(45),
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Taikhoannganhang',
        freezeTableName: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_0900_ai_ci',
        tableName: 'taikhoannganhang'
    });

    return Taikhoannganhang;
};
