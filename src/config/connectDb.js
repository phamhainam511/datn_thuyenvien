const {
    Sequelize
} = require('sequelize');

const sequelize = new Sequelize('db1', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Kết nối SQL thành công');
    } catch (error) {
        console.error('Lỗi kết nối SQL: ', error);
    }
};

module.exports = connectDB;