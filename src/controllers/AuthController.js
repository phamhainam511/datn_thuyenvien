import AuthService from '../services/AuthService';

let handleLogin = async (req, res) => {
    try {
        let taikhoan = req.body.taikhoan;
        let matkhau = req.body.matkhau;
        
        if (!taikhoan || !matkhau) {
            return res.render('dangnhap.ejs', {
                error: 'Vui lòng nhập đầy đủ thông tin đăng nhập'
            });
        }
        
        let userData = await AuthService.handleLogin(taikhoan, matkhau);
        
        if (userData.errCode === 0) {
            // Create session
            if (!req.session) {
                req.session = {};
            }
            req.session.user = userData.user;
            req.session.isAuthenticated = true;
            
            // Ensure phanquyen_id is available
            if (!userData.user.phanquyen_id) {
                console.error('User role not found:', userData.user);
                return res.render('dangnhap.ejs', {
                    error: 'Lỗi phân quyền người dùng'
                });
            }
            
            return res.redirect('/');
        } else {
            return res.render('dangnhap.ejs', {
                error: userData.errMessage
            });
        }
    } catch (e) {
        console.error(e);
        return res.render('dangnhap.ejs', {
            error: 'Đã xảy ra lỗi, vui lòng thử lại sau'
        });
    }
};

let handleLogout = (req, res) => {
    if (req.session) {
        req.session.destroy(function(err) {
            if (err) {
                console.error(err);
            }
            res.redirect('/login');
        });
    } else {
        res.redirect('/login');
    }
};

let getLoginPage = (req, res) => {
    // Check if session exists before trying to access properties
    if (req.session && req.session.isAuthenticated) {
        return res.redirect('/');
    }
    return res.render('dangnhap.ejs', { error: null });
};

module.exports = {
    handleLogin: handleLogin,
    handleLogout: handleLogout,
    getLoginPage: getLoginPage
};
