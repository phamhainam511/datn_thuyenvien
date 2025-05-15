'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Thuyenvien extends Model {
        static associate(models) {
            
        }
    }

    Thuyenvien.init({
        id_thuyenvien: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        anh: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        hoten: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        cccd: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        sodienthoai: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        chieucao: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cannang: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        nhommau: {
            type: DataTypes.STRING(5),
            allowNull: false
        },
        sizegiay: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tinhtranghonnhan: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        ngaysinh: {
            type: DataTypes.DATE,
            allowNull: false
        },
        sizegiaybaoho: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'Thuyenvien',
        freezeTableName: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_0900_ai_ci',
        tableName: 'thuyenvien'
    });

    return Thuyenvien;
};
