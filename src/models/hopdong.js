'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Hopdong extends Model {
        static associate(models) {
            // Định nghĩa các quan hệ nếu cần thiết
        }
    }

    Hopdong.init({
        id_hopdong: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tenhopdong: {
            type: DataTypes.STRING(45),
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Hopdong',
        freezeTableName: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_0900_ai_ci',
        tableName: 'hopdong'
    });

    return Hopdong;
};
