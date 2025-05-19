'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ThuyenvienTrangthai extends Model {
        static associate(models) {
            ThuyenvienTrangthai.belongsTo(models.Thuyenvien, {
                foreignKey: 'thuyenvien_id',
                as: 'thuyenvien'
            });

            ThuyenvienTrangthai.belongsTo(models.Trangthai, {
                foreignKey: 'trangthai_id',
                as: 'trangthai'
            });
        }
    }

    ThuyenvienTrangthai.init({
        thuyenvien_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        trangthai_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        thoigian: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'ThuyenvienTrangthai',
        freezeTableName: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_0900_ai_ci',
        tableName: 'thuyenvien_trangthai'
    });

    return ThuyenvienTrangthai;
};
