import db from '../models/index';

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await db.user.create({
                taikhoan: data.taikhoan,
                hoten: data.hoten,
                phongban: data.phongban,
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
                where: { id: user_id }
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
                    hoten: data.hoten,
                    phongban: data.phongban,
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


module.exports = {
    createNewUser: createNewUser,
    getComboPhanQuyen: getComboPhanQuyen,
    getAllUser: getAllUser,
    getUserId: getUserId,
    resetPassword: resetPassword,
    updateUserData: updateUserData,
    deleteUser: deleteUser,
}