'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Lichsuditau extends Model {
        static associate(models) {
            Lichsuditau.belongsTo(models.Chucvu, { foreignKey: 'chucvu_id', targetKey: 'id_chucvu' });
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
