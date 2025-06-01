'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class ThuyenvienHocvan extends Model {
        static associate(models) {
            // Define relationship with thuyenvien table as one-to-one
            ThuyenvienHocvan.belongsTo(models.Thuyenvien, {
                foreignKey: 'id_thuyenvien',
                as: 'thuyenvien'
            });
        }
    }

    ThuyenvienHocvan.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        id_thuyenvien: {
            type: DataTypes.INTEGER,
            allowNull: true,
            unique: true // Add unique constraint to ensure one-to-one relationship
        },
        truongdaotao: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        hedaotao: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        namtotnghiep: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'ThuyenvienHocvan',
        freezeTableName: true,
        tableName: 'thuyenvien_hocvan'
    });

    return ThuyenvienHocvan;
};
