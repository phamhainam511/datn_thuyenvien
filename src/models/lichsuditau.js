'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class Lichsuditau extends Model {
        static associate(models) {
            this.belongsTo(models.Thuyenvien, {
                foreignKey: 'thuyenvien_id',
                as: 'thuyenvien'
            });
            this.belongsTo(models.Chucvu, {
                foreignKey: 'chucvu_id',
                as: 'chucvu'
            });
            Lichsuditau.belongsTo(models.Tau, {
                foreignKey: 'tau_id',
                as: 'tau'
            });
        }
    }

    Lichsuditau.init({
        id_lichsuditau: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        thuyenvien_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        chucvu_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tau_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        timexuatcanh: {
            type: DataTypes.DATE,
            allowNull: false
        },
        timelentau: {
            type: DataTypes.DATE,
            allowNull: false
        },
        ngayroitau: {
            type: DataTypes.DATE,
            allowNull: true
        },
        cangroitau: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        quoctich_thuyen: {
            type: DataTypes.STRING(50),
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'Lichsuditau',
        freezeTableName: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_0900_ai_ci',
        tableName: 'lichsuditau'
    });

    return Lichsuditau;
};
