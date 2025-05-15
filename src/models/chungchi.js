'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Chungchi extends Model {
        static associate(models) {
            // define association here
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
