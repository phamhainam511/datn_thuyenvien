'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Thannhan extends Model {
        static associate(models) {
            // Thêm quan hệ với bảng `thuyenvien`
            
        }
    }

    Thannhan.init({
        id_thannhan: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        thuyenvien_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        hotenbo: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        sdtbo: {
            type: DataTypes.STRING(11),
            allowNull: true
        },
        hotenme: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        sdtme: {
            type: DataTypes.STRING(11),
            allowNull: true
        },
        hotenvo: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        sdtvo: {
            type: DataTypes.STRING(11),
            allowNull: true
        },
        nguoigiamho: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        sdtgiamho: {
            type: DataTypes.STRING(11),
            allowNull: true
        },
        diachi: {
            type: DataTypes.STRING(100),
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'Thannhan',
        freezeTableName: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_0900_ai_ci',
        tableName: 'thannhan'
    });

    return Thannhan;
};
