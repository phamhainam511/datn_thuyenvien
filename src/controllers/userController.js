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
    try {
        let ids = req.body.id; // có thể là 1 id hoặc mảng id
        if (!Array.isArray(ids)) {
            ids = [ids]; // chuyển thành mảng nếu không phải
        }
        for (let id of ids) {
            await UserServices.deleteUser(id);
        }
        return res.redirect('/danh-sach-user');
    } catch (error) {
        res.send('Lỗi: ' + error.message);
    }
};

let ChangePassword = async (req, res) => {
    try {
        const taikhoan = req.session.user.taikhoan; // từ session
        const { currentPassword, newPassword, confirmPassword } = req.body;

        let errors = [];
        if (!currentPassword || !newPassword || !confirmPassword) {
            errors.push('Vui lòng nhập đầy đủ thông tin.');
        }
        if (newPassword !== confirmPassword) {
            errors.push('Mật khẩu mới và xác nhận không khớp.');
        }

        if (errors.length > 0) {
            return res.render('doimatkhau.ejs', { errors, success: null });
        }

        const result = await UserServices.changePassword(taikhoan, currentPassword, newPassword);

        if (result.success) {
            return res.render('doimatkhau.ejs', { errors: [], success: 'Đổi mật khẩu thành công!' });
        } else {
            return res.render('doimatkhau.ejs', { errors: [result.message], success: null });
        }
    } catch (error) {
        console.error(error);
        return res.render('doimatkhau.ejs', { errors: ['Có lỗi xảy ra, vui lòng thử lại.'], success: null });
    }
};
module.exports = {
    getAllUser: getAllUser,
    postUser: postUser,
    getEditUser: getEditUser,
    putUser: putUser,
    resetPassword: resetPassword,
    deleteUser: deleteUser,
    ChangePassword: ChangePassword
}