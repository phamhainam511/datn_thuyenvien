'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Bangluong extends Model {
        static associate(models) {
            this.belongsTo(models.Thuyenvien, {
                foreignKey: 'thuyenvien_id',
                as: 'thuyenvien'
            });
        }
    }

    Bangluong.init({
        id_bangluong: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        thuyenvien_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        luongcb: {
            type: DataTypes.DECIMAL(10, 0),
            allowNull: false
        },
        tigia: {
            type: DataTypes.DECIMAL(10, 0),
            allowNull: false
        },
        socong: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        thoigian: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        phuongthuc: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        tinhtrang: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'Bangluong',
        freezeTableName: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_0900_ai_ci',
        tableName: 'bangluong'
    });

    return Bangluong;
};
