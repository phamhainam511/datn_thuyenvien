import db from '../models';
import UserServices from "../services/UserServices";

let getAllUser = async (req, res) => {
    try {
        let data = await UserServices.getAllUser();
        let comboPhanQuyen = await UserServices.getComboPhanQuyen();
        return res.render('danhsach_user.ejs', {
            dataTable: data,
            dataPhanQuyen: comboPhanQuyen
        });
    } catch (e) {
        console.error(e);
        return res.status(500).send('Lỗi khi lấy dữ liệu');
    }
};

let postUser = async (req, res) => {
    let message = await UserServices.createNewUser(req.body);
    res.redirect('/danh-sach-user');
}
let getEditUser = async (req, res) => {
    let user_id = req.query.id;
    if (user_id) {
        let user_data = await UserServices.getUserId(user_id);
        console.log(user_data);
        return res.send('Tìm thấy tài khoản');
    } else {
        return res.send('Không tìm thấy tài khoản');
    }
}

let putUser = async (req, res) => {
    try {
        let data = req.body;
        await UserServices.updateUserData(data);
        return res.redirect('/danh-sach-user');
    } catch (error) {
        res.send('Lỗi: ' + error.message);
    }
}

let resetPassword = async (req, res) => {
    try {
        let ids = req.body.id;
        await UserServices.resetPassword(ids);
        return res.redirect('/danh-sach-user');
    } catch (error) {
        res.send('Lỗi: ' + error.message);
    }
}

let deleteUser = async (req, res) => {
    let ids = req.body.id; // => mảng id
    if (!Array.isArray(ids)) {
        ids = [ids]; // nếu gửi 1 id thì cho thành mảng luôn
    }

    for (let id of ids) {
        await UserServices.deleteUser(id);
    }

    return res.redirect('/danh-sach-user');
};

module.exports = {
    getAllUser: getAllUser,
    postUser: postUser,
    getEditUser: getEditUser,
    putUser: putUser,
    resetPassword: resetPassword,
    deleteUser: deleteUser,
}