import {
    Sequelize
} from 'sequelize';

const sequelize = new Sequelize('db2', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Kết nối SQL thành công');
    } catch (error) {
        console.error('Lỗi kết nối SQL: ', error);
    }
};

export default connectDB;