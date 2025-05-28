import ThuyenVienController from '../controllers/ThuyenVienController';

/**
 * Middleware để chèn dữ liệu thông báo (notifications) vào view.
 * 
 * - Nếu người dùng chưa đăng nhập, middleware sẽ bỏ qua.
 * - Nếu đã đăng nhập, gọi controller để lấy số lượng thông báo và đính kèm vào `res.locals.notifications`.
 * - Trong view (template), dùng `notifications` để hiển thị cảnh báo, tin nhắn, v.v.
 */
const NotificationMiddleware = {
    async injectNotificationData(req, res, next) {
        try {
            if (!req.session || !req.session.user) {
                return next();
            }
            
            const notificationData = await ThuyenVienController.getNotificationCounts();

            console.log('Notification data:', notificationData);
            
            res.locals.notifications = notificationData;
            
            next();
        } catch (error) {
            console.error('Lỗi trong notification middleware:', error);
            next();
        }
    }
};

export default NotificationMiddleware;