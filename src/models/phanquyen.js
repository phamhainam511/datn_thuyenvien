'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class phanquyen extends Model {
        static associate(models) {
            phanquyen.hasMany(models.user, {
                foreignKey: 'phanquyen_id',
                as: 'users'
            });

        }
    }

    phanquyen.init({
        id_phanquyen: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        tenphanquyen: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        mota: {
            type: DataTypes.STRING(45),
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'phanquyen',
        freezeTableName: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_0900_ai_ci',
    });

    return phanquyen;
};