'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Chucvu extends Model {
        static associate(models) {
            
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
        modelName: 'chucvu',      
        freezeTableName: true      
    });

    return Chucvu;
};
