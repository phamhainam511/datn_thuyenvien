'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ChucvuChungchi extends Model {
        static associate(models) {
            
        }
    }

    ChucvuChungchi.init({
        id_chungchi_chucvu: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        chucvu_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        chungchi_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'chucvuchungchi',
        tableName: 'chucvu_chungchi',
        freezeTableName: true,
        timestamps: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_0900_ai_ci'
    });

    return ChucvuChungchi;
};