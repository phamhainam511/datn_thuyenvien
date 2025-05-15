const {
    Sequelize
} = require('sequelize');

const sequelize = new Sequelize('database', 'root', 'root', {
    host: 'localhost',
    port: 3320,
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