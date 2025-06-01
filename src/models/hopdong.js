'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class Hopdong extends Model {
        static associate(models) {
            // Quan hệ: hợp đồng thuộc về 1 thuyền viên
            Hopdong.belongsTo(models.Thuyenvien, {
                foreignKey: 'thuyenvien_id',
                targetKey: 'id_thuyenvien',
                as: 'thuyenvien'
            });
        }
    }

    Hopdong.init({
        id_hopdong: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        thuyenvien_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ngayky: {
            type: DataTypes.DATE,
            allowNull: false
        },
        ngayhethan: {
            type: DataTypes.DATE,
            allowNull: false
        },
        ngaythanhly: {
            type: DataTypes.DATE,
            allowNull: true
        },
        trangthaihopdong: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        hinhanh: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Hopdong',
        freezeTableName: true,
        tableName: 'hopdong',
        charset: 'utf8mb4',
        collate: 'utf8mb4_0900_ai_ci',
        timestamps: false
    });

    return Hopdong;
};
