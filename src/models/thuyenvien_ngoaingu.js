'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class ThuyenvienNgoaingu extends Model {
        static associate(models) {
            // Define relationship with thuyenvien table
            ThuyenvienNgoaingu.belongsTo(models.Thuyenvien, {
                foreignKey: 'id_thuyenvien',
                as: 'thuyenvien'
            });
        }
    }

    ThuyenvienNgoaingu.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        id_thuyenvien: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        ngonngu: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        tenchungchi: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        diemso: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        ngaycap: {
            type: DataTypes.DATE,
            allowNull: true
        },
        ngayhethan: {
            type: DataTypes.DATE,
            allowNull: true
        },
        file: {
            type: DataTypes.STRING(255),
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'ThuyenvienNgoaingu',
        freezeTableName: true,
        tableName: 'thuyenvien_ngoaingu'
    });

    return ThuyenvienNgoaingu;
};
