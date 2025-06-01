'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class Taikhoannganhang extends Model {
        static associate(models) {
            this.belongsTo(models.Thuyenvien, {
                foreignKey: 'thuyenvien_id',
                as: 'thuyenvien'
            });
        }
    }

    Taikhoannganhang.init({
        thuyenvien_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        stk: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
        tentaikhoan: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        tennganhang: {
            type: DataTypes.STRING(45),
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Taikhoannganhang',
        freezeTableName: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_0900_ai_ci',
        tableName: 'taikhoannganhang'
    });

    return Taikhoannganhang;
};
