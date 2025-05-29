'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Chucvu extends Model {
        static associate(models) {
            Chucvu.hasMany(models.Lichsuditau, { foreignKey: 'chucvu_id', sourceKey: 'id_chucvu' });
            this.hasMany(models.chucvuchungchi, {
                foreignKey: 'chucvu_id',
                as: 'chucvu'
            });
        }
    }

    Chucvu.init({
        id_chucvu: {
            type: DataTypes.INTEGER,
            primaryKey: true,          
            autoIncrement: true        
        },
        tenchucvu: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Chucvu',
        freezeTableName: true
    });

    return Chucvu;
};
