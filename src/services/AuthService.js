import db from '../models/index';

let handleLogin = (taikhoan, matkhau) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            
            // Check if account exists
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
                // Compare password
                if (user.matkhau === matkhau) {
                    userData.errCode = 0;
                    userData.errMessage = "Đăng nhập thành công";
                    
                    // Don't send password to client
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
