'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class ThuyenvienTailieu extends Model {
        static associate(models) {
            // Define relationship with thuyenvien table
            ThuyenvienTailieu.belongsTo(models.Thuyenvien, {
                foreignKey: 'id_thuyenvien',
                as: 'thuyenvien'
            });
        }
    }

    ThuyenvienTailieu.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_thuyenvien: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cccd_mattruoc: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        cccd_matsau: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        phieutiemvacxin: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        chungnhanvangda: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        sequelize,
        modelName: 'ThuyenvienTailieu',
        freezeTableName: true,
        tableName: 'thuyenvien_tailieu'
    });

    return ThuyenvienTailieu;
};
