import db from '../models';
import UserServices from "../services/UserServices.js";

let getAllUser = async (req, res) => {
    try {
        let data = await UserServices.getAllUser();
        let comboPhanQuyen = await UserServices.getComboPhanQuyen();
        return res.render('danhsach_user.ejs', {
            dataTable: data,
            dataPhanQuyen: comboPhanQuyen,
            alertMessage: null
        });
    } catch (e) {
        console.error(e);
        return res.render('danhsach_user.ejs', {
            dataTable: [],
            dataPhanQuyen: [],
            alertMessage: 'Lỗi khi lấy dữ liệu từ server!'
        });
    }
};

let postUser = async (req, res) => {
    try {
        let message = await UserServices.createNewUser(req.body);

        if (message.errCode === 0) {
            res.redirect('/danh-sach-user?msg=success');
        } else {
            res.redirect('/danh-sach-user?msg=fail&detail=' + encodeURIComponent(message.errMessage));
        }
    } catch (e) {
        console.error(e);
        res.redirect('/danh-sach-user?msg=error&detail=' + encodeURIComponent(e.message));
    }
};

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
        let result = await UserServices.updateUserData(data);

        if (result.errCode === 0) {
            return res.redirect('/danh-sach-user?status=update_success');
        } else {
            return res.redirect('/danh-sach-user?status=update_fail&detail1=' + encodeURIComponent(result.errMessage));
        }
    } catch (error) {
        return res.redirect('/danh-sach-user?status=error&detail1=' + encodeURIComponent(error.message));
    }
}


let resetPassword = async (req, res) => {
    try {
        let userId = req.body.id;
        let result = await UserServices.resetPassword(userId);

        if (result.errCode === 0) {
            return res.redirect('/danh-sach-user?status1=reset_success');
        } else {
            return res.redirect('/danh-sach-user?status1=reset_fail&detail2=' + encodeURIComponent(result.errMessage));
        }
    } catch (error) {
        return res.redirect('/danh-sach-user?status1=error&detail2=' + encodeURIComponent(error.message));
    }
};


let deleteUser = async (req, res) => {
    try {
        let ids = req.body.id;
        if (!Array.isArray(ids)) {
            ids = [ids];
        }

        const currentUserId = req.session.user.taikhoan;

        let results = await Promise.all(
            ids.map(id => UserServices.deleteUser(id, currentUserId))
        );

        let failed = results.find(r => r.errCode !== 0);
        if (failed) {
            return res.redirect('/danh-sach-user?status3=delete_fail&detail3=' + encodeURIComponent(failed.errMessage));
        }

        return res.redirect('/danh-sach-user?status3=delete_success');
    } catch (error) {
        return res.redirect('/danh-sach-user?status3=error&detail3=' + encodeURIComponent(error.message));
    }
};


let ChangePassword = async (req, res) => {
    try {
        const taikhoan = req.session.user.taikhoan; 
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