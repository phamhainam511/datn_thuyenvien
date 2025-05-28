import db from '../models/index';
import bcrypt from 'bcrypt';

let handleLogin = (taikhoan, matkhau) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};

            let user = await db.user.findOne({
                where: { taikhoan: taikhoan },
                raw: false,
                include: [
                    {
                        model: db.phanquyen,
                        as: 'phanquyen',
                        attributes: ['tenphanquyen']
                    }
                ]
            });

            if (user) {
                let isMatch = false;

                if (user.matkhau.startsWith('$2b$')) {
                    // Mật khẩu đã được mã hoá
                    isMatch = await bcrypt.compare(matkhau, user.matkhau);
                } else {
                    // Mật khẩu chưa mã hoá
                    isMatch = matkhau === user.matkhau;
                }
                
                if (isMatch) {
                    userData.errCode = 0;
                    userData.errMessage = "Đăng nhập thành công";

                    const userObj = user.get({ plain: true });
                    delete userObj.matkhau;
                    userData.user = userObj;
                } else {
                    userData.errCode = 3;
                    userData.errMessage = "Mật khẩu không chính xác";
                }
            } else {
                userData.errCode = 2;
                userData.errMessage = "Tài khoản không tồn tại";
            }

            resolve(userData);
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    handleLogin: handleLogin
};
