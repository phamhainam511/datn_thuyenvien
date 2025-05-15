import db from '../models';
import UserServices from "../services/UserServices";

let getAllUser = async (req, res) => {
    try {
        let data = await UserServices.getAllUser();
        return res.render('danhsach_user.ejs', {
            dataTable: data
        });
    } catch (e) {
        console.error(e);
        return res.status(500).send('Lỗi khi lấy dữ liệu');
    }
};

module.exports = {
    getAllUser : getAllUser,
}