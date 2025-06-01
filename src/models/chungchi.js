'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class Chungchi extends Model {
        static associate(models) {
            Chungchi.belongsToMany(models.Thuyenvien, {
                through: models.ThuyenvienChungchi,
                foreignKey: 'id_chungchi',
                otherKey: 'id_thuyenvien',
                as: 'thuyenviens'
            });
            Chungchi.hasMany(models.ThuyenvienChungchi, {
                foreignKey: 'id_chungchi',
                as: 'thuyenvien'
            });
            this.hasMany(models.chucvuchungchi, {
                foreignKey: 'chungchi_id',
                as: 'chungchi'
            });
            
        }
    }

    Chungchi.init({
        id_chungchi: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tenchungchi: DataTypes.STRING,
        tieuchuanapdung: DataTypes.STRING
    }, {
        sequelize,
        tableName: 'chungchi',
        modelName: 'Chungchi',
        freezeTableName: true
    });

    return Chungchi;
};
