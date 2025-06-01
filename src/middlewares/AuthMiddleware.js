import { hasAccess } from '../utils/permissions.js';

/**
 * Middleware kiểm tra người dùng đã đăng nhập hay chưa.
 * Nếu đã đăng nhập, thêm thông tin người dùng vào `res.locals` để dùng trong view.
 * Nếu chưa đăng nhập, chuyển hướng về trang đăng nhập.
 */
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.isAuthenticated) {
    res.locals.user = req.session.user;
    return next();
  }
  
  return res.redirect('/login');
};

/**
 * Middleware kiểm tra quyền truy cập của người dùng với route hiện tại.
 * - Đảm bảo người dùng đã đăng nhập (nếu chưa, chuyển hướng về trang đăng nhập).
 * - Lấy vai trò người dùng từ session, xác định route đang truy cập.
 * - Gọi hàm `hasAccess()` để kiểm tra quyền:
 *    - Nếu có quyền: tiếp tục.
 *    - Nếu không: hiển thị trang từ chối truy cập.
 */
const checkPermission = (req, res, next) => {
  if (!req.session || !req.session.isAuthenticated) {
    return res.redirect('/login');
  }
  
  const role = req.session.user.phanquyen_id;
  const path = req.path;
  
  if (hasAccess(role, path)) {
    res.locals.user = req.session.user;
    return next();
  }
  // Nếu không có quyền truy cập, hiển thị trang thông báo
  return res.render('access-denied', {
    message: 'Bạn không có quyền truy cập trang này',
    user: req.session.user,
    activeMenu: ''
  });
};

const AuthMiddleware = {
  isAuthenticated,
  checkPermission
};
export default AuthMiddleware;
