'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Tau extends Model {
        static associate(models) {
            // Định nghĩa quan hệ với bảng loaitau
            // Một tàu thuộc về một loại tàu
            // Tau.belongsTo(models.LoaiTau, {
            //     foreignKey: 'loaitau_id',
            //     as: 'loaitau'
            // });
        }
    }

    Tau.init({
        id_tau: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tentau: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        quoctich: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        loaitau_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Tau',
        freezeTableName: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_0900_ai_ci',
        tableName: 'tau'
    });

    return Tau;
};
