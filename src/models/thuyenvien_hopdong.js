'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ThuyenvienHopdong extends Model {
        static associate(models) {
            
        }
    }

    ThuyenvienHopdong.init({
        id_thuyenvien_hopdong: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        thuyenvien_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        hopdong_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ngayky: {
            type: DataTypes.DATE,
            allowNull: false
        },
        ngayhethan: {
            type: DataTypes.DATE,
            allowNull: false
        },
        trangthaihopdong: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        hinhanh: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'ThuyenvienHopdong',
        tableName: 'thuyenvien_hopdong',
        freezeTableName: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_0900_ai_ci'
    });

    return ThuyenvienHopdong;
};