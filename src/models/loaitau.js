'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Loaitau extends Model {
        static associate(models) {
            this.hasMany(models.Tau, {
                foreignKey: 'loaitau_id',
                as: 'tau'
            });
        }
    }

    Loaitau.init({
        id_loaitau: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tenloaitau: {
            type: DataTypes.STRING(30),
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Loaitau',
        freezeTableName: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_0900_ai_ci',
        tableName: 'loaitau'
    });

    return Loaitau;
};
