'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class user extends Model {
        static associate(models) {
            // Khóa ngoại đến bảng phanquyen
            user.belongsTo(models.phanquyen, {
                foreignKey: 'phanquyen_id',
                as: 'phanquyen'
            });
        }
    }

    user.init({
        taikhoan: {
            type: DataTypes.STRING(30),
            primaryKey: true,
            allowNull: false
        },
        hoten: {
            type: DataTypes.STRING,
            allowNull: false
        },
        matkhau: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        sdt: {
            type: DataTypes.STRING(15),
            allowNull: true
        },
        diachi: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isEmail: true
            }
        },
        phanquyen_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'user',
        freezeTableName: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_0900_ai_ci'
    });

    return user;
};
