import db from '../models/index.js';
import bcrypt from 'bcrypt';
import ChuanHoaServices from '../services/ChuanHoaServices.js';

let createNewUser = async (data) => {
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
        return {
            errCode: 0,
            errMessage: 'Tạo user thành công',
            data: result
        };

    } catch (error) {
        let errMsg = 'Lỗi không xác định';
        if (error.name === 'SequelizeUniqueConstraintError') {
            errMsg = `Dữ liệu đã tồn tại, không được phép trùng!`;
        } else if (error.name === 'SequelizeValidationError') {
            errMsg = error.errors.map(e => e.message).join('; ');
        } else if (error.message) {
            errMsg = error.message;
        }
        return {
            errCode: 1,
            errMessage: errMsg
        };
    }
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
                include: [{
                    model: db.phanquyen,
                    as: 'phanquyen',
                    attributes: ['tenphanquyen']
                }]
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
                where: {
                    taikhoan: user_id
                }
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

let updateUserData = async (data) => {
    try {
        await db.user.update({
            hoten: ChuanHoaServices.chuanHoaTen(data.hoten),
            sdt: data.sdt,
            diachi: data.diachi,
            email: data.email,
            phanquyen_id: data.phanquyen_id
        }, {
            where: {
                taikhoan: data.taikhoan
            }
        });

        return {
            errCode: 0,
            errMessage: 'Cập nhật thành công!'
        };
    } catch (error) {
        console.log(error);

        let errMsg = 'Lỗi không xác định';
        if (error.name === 'SequelizeValidationError') {
            errMsg = error.errors.map(e => e.message).join('; ');
        } else if (error.message) {
            errMsg = error.message;
        }

        return {
            errCode: 1,
            errMessage: errMsg
        };
    }
};


let resetPassword = async (user_id) => {
    try {
        await db.user.update({
            matkhau: '123'
        }, {
            where: {
                taikhoan: user_id
            }
        });
        return {
            errCode: 0,
            errMessage: 'Reset mật khẩu thành công!'
        };
    } catch (error) {
        let errMsg = 'Lỗi không xác định';
        if (error.message) errMsg = error.message;
        return {
            errCode: 1,
            errMessage: errMsg
        };
    }
};


let deleteUser = async (user_id, currentUserId) => {
    try {
        if (user_id === currentUserId) {
            return {
                errCode: 2,
                errMessage: 'Không thể xóa tài khoản của chính bạn!'
            };
        }

        let user = await db.user.findOne({
            where: { taikhoan: user_id }
        });
        if (user) {
            await user.destroy();
        }
        return { errCode: 0, errMessage: 'Xóa user thành công' };
    } catch (error) {
        return { errCode: 1, errMessage: error.message || 'Lỗi khi xóa user' };
    }
};




let changePassword = async (taikhoan, currentPassword, newPassword) => {
    try {
        const user = await db.user.findByPk(taikhoan);

        if (!user) {
            return {
                errCode: 1,
                message: 'Người dùng không tồn tại!'
            };
        }

        let isMatch = false;

        if (user.matkhau.startsWith('$2b$')) {
            isMatch = await bcrypt.compare(currentPassword, user.matkhau);
        } else {
            isMatch = currentPassword === user.matkhau;
        }

        if (!isMatch) {
            return {
                errCode: 2,
                message: 'Mật khẩu hiện tại không đúng!'
            };
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.matkhau = hashedPassword;
        await user.save();

        return {
            errCode: 0,
            message: 'Đổi mật khẩu thành công!'
        };
    } catch (error) {
        console.error('Change password error:', error);
        return {
            errCode: 3,
            message: 'Lỗi máy chủ!'
        };
    }
};

const UserServices = {
    createNewUser: createNewUser,
    getComboPhanQuyen: getComboPhanQuyen,
    getAllUser: getAllUser,
    getUserId: getUserId,
    resetPassword: resetPassword,
    updateUserData: updateUserData,
    deleteUser: deleteUser,
    changePassword: changePassword,
};
export default UserServices;