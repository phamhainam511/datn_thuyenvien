import db from '../models/index';
import bcrypt from 'bcrypt';
import ChuanHoaServices from '../services/ChuanHoaServices';

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await db.user.create({
                taikhoan: data.taikhoan,
                hoten: ChuanHoaServices.chuanHoaTen(data.hoten),
                matkhau: data.matkhau,
                sdt: data.sdt,
                diachi: data.diachi,
                email: data.email,
                phanquyen_id: data.phanquyen_id
            })
            resolve(result);
        } catch (e) {
            reject(e);
        }
    })

}

let getComboPhanQuyen = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let comboPhanQuyen = await db.phanquyen.findAll({
                attributes: ['id_phanquyen', 'tenphanquyen'],
            })
            resolve(comboPhanQuyen);
        } catch (e) {
            reject(e);
        }
    });
};

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.user.findAll({
                raw: false,
                include: [
                    {
                        model: db.phanquyen,
                        as: 'phanquyen',
                        attributes: ['tenphanquyen']
                    }
                ]
            });
            resolve(users);
        } catch (e) {
            reject(e);
        }
    });
};

let getUserId = (user_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.user.findOne({
                where: { taikhoan: user_id }
            })
            if (user) {
                resolve(user);
            } else {
                resolve([]);
            }
        } catch (e) {
            reject(e);
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.user.update(
                {
                    hoten: ChuanHoaServices.chuanHoaTen(data.hoten),
                    sdt: data.sdt,
                    diachi: data.diachi,
                    email: data.email,
                    phanquyen_id: data.phanquyen_id
                },
                {
                    where: { taikhoan: data.taikhoan }
                }
            );
            resolve('Cập nhật thành công!');
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
}

let resetPassword = (user_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.user.update(
                {
                    matkhau: '123'
                },
                {
                    where: { taikhoan: user_id }
                }
            );
            resolve('Reset mật khẩu thành công!');
        } catch (e) {
            reject(e);
        }
    })
}

let deleteUser = (user_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.user.findOne({
                where: { taikhoan: user_id }
            })
            if (user) {
                await user.destroy();
            }
            resolve();
        } catch (e) {
            reject(e);
        }
    })
}


let changePassword = async (taikhoan, currentPassword, newPassword) => {
    try {
        const user = await db.user.findByPk(taikhoan);

        if (!user) {
            return { errCode: 1, message: 'Người dùng không tồn tại!' };
        }

        let isMatch = false;

        // Kiểm tra xem mật khẩu đã được mã hoá hay chưa
        if (user.matkhau.startsWith('$2b$')) {
            isMatch = await bcrypt.compare(currentPassword, user.matkhau);
        } else {
            isMatch = currentPassword === user.matkhau;
        }

        if (!isMatch) {
            return { errCode: 2, message: 'Mật khẩu hiện tại không đúng!' };
        }

        // Hash mật khẩu mới
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Cập nhật mật khẩu mới
        user.matkhau = hashedPassword;
        await user.save();

        return { errCode: 0, message: 'Đổi mật khẩu thành công!' };
    } catch (error) {
        console.error('Change password error:', error);
        return { errCode: 3, message: 'Lỗi máy chủ!' };
    }
};

module.exports = {
    createNewUser: createNewUser,
    getComboPhanQuyen: getComboPhanQuyen,
    getAllUser: getAllUser,
    getUserId: getUserId,
    resetPassword: resetPassword,
    updateUserData: updateUserData,
    deleteUser: deleteUser,
    changePassword: changePassword,
}