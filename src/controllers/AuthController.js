import AuthService from '../services/AuthService.js';
/**
 * Xử lý yêu cầu đăng nhập người dùng.
 * 
 * - Kiểm tra thông tin đầu vào: tài khoản và mật khẩu.
 * - Gọi AuthService để xác thực người dùng.
 * - Nếu thành công:
 *   - Tạo session và lưu thông tin người dùng.
 *   - Kiểm tra quyền người dùng (`phanquyen_id`) và điều hướng về trang chính.
 * - Nếu thất bại hoặc lỗi hệ thống: hiển thị lỗi tại trang đăng nhập.
 */
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
            if (!req.session) {
                req.session = {};
            }
            req.session.user = userData.user;
            req.session.isAuthenticated = true;
            
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
/**
 * Xử lý đăng xuất người dùng:
 * - Hủy session hiện tại (nếu tồn tại).
 * - Chuyển hướng về trang đăng nhập.
 */
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

/**
 * Render trang đăng nhập.
 * - Nếu người dùng đã đăng nhập, chuyển hướng về trang chính.
 * - Nếu chưa, hiển thị form đăng nhập.
 */
let getLoginPage = (req, res) => {
    if (req.session && req.session.isAuthenticated) {
        return res.redirect('/');
    }
    return res.render('dangnhap.ejs', { error: null });
};

const AuthController = {
    handleLogin,
    handleLogout,
    getLoginPage
}
export default AuthController;