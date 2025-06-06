import express from "express";
import ChungChiController from '../controllers/ChungChiController.js';
import ThuyenVienController from '../controllers/ThuyenVienController.js';
import AuthController from '../controllers/AuthController.js';
import AuthMiddleware from '../middlewares/AuthMiddleware.js';
import HopDongController from '../controllers/HopDongController.js';
import UserController from '../controllers/userController.js';
import BangLuongController from '../controllers/BangLuongController.js';
import BangLuongChiTietController from '../controllers/BangLuongChiTietController.js';
import ThuyenVienLuongController from '../controllers/ThuyenVienLuongController.js';
import ChucVuController from '../controllers/ChucVuController.js';
import TauController from '../controllers/TauController.js';
import DashBoardController from '../controllers/DashBoardController.js';
import NotificationMiddleware from '../middlewares/NotificationMiddleware.js';
import exportCV from "../controllers/ExcelController.js";

const router = express.Router();

const initWebRoutes = (app) => {
    // Auth routes
    router.get('/login', AuthController.getLoginPage);
    router.post('/login', AuthController.handleLogin);
    router.get('/logout', AuthController.handleLogout);

    // Access denied route
    router.get('/access-denied', (req, res) => {
        res.render('access-denied.ejs', {
            message: 'Bạn không có quyền truy cập trang này',
            user: req.session && req.session.user ? req.session.user : null,
            activeMenu: ''
        });
    });

    // Protected routes - require authentication
    router.use('/', (req, res, next) => {
        // Skip authentication check for login routes
        if (req.path === '/login' || req.path === '/logout' || req.path === '/access-denied') {
            return next();
        }
        return AuthMiddleware.isAuthenticated(req, res, next);
    });
    // Add notification middleware for authenticated routes
    router.use(NotificationMiddleware.injectNotificationData);


    //Dashboard route
    router.get('/', AuthMiddleware.checkPermission, async (req, res) => {
        try {
            const expiringCertCount = await DashBoardController.getExpiringCertificateCount(365); // số chứng chỉ hết hạn trong 30 ngày
            const pendingContractCount = await DashBoardController.getPendingContractsCount();
            const soThuyenVienDangTrenTau = await DashBoardController.getThuyenvienDangTrenTau();
            const soThuyenVienDangChoTau = await DashBoardController.getThuyenvienDangChoTau();
            const chucVuStats = await DashBoardController.getChucVuStats();
            const thuyenvienTrangThaiStats = await DashBoardController.getThuyenvienTrangThaiStats();

            res.render('trangchu.ejs', {
                activeMenu: 'dashboard',
                user: req.session.user,
                expiringCertCount,
                pendingContractCount,
                soThuyenVienDangTrenTau,
                soThuyenVienDangChoTau,
                chucVuStatsJson: JSON.stringify(chucVuStats),
                thuyenvienTrangThaiStatsJson: JSON.stringify(thuyenvienTrangThaiStats)
            });
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu dashboard:', error);
            // Có thể render trang lỗi hoặc trả về status 500
            res.status(500).send('Lỗi server, vui lòng thử lại sau');
        }
    });


    //router.get('/', AuthMiddleware.checkPermission, DashBoardController);

    // Apply permission check to all other routes
    router.use((req, res, next) => {
        // Skip permission check for login routes
        if (req.path === '/login' || req.path === '/logout' || req.path === '/access-denied' || req.path === '/') {
            return next();
        }
        return AuthMiddleware.checkPermission(req, res, next);
    });

    //thuyền viên ở đây
    router.get('/lich-su-di-tau', ChungChiController.getAllLichSuDiTau);
    router.post('/them-lich-su-di-tau', ThuyenVienController.createLichSuDiTau);
    router.post('/cap-nhat-lich-su-di-tau', ThuyenVienController.updateLichSuDiTau);
    router.post('/xoa-lich-su-di-tau', ThuyenVienController.deleteLichSuDiTau);
    router.get('/danh-sach-thuyen-vien', ThuyenVienController.getAllThuyenVien);
    router.get('/danh-sach-thuyen-vien/:id', ThuyenVienController.getThuyenVienById);
    router.post('/cap-nhat-thuyen-vien/:id', ThuyenVienController.putThuyenVien);
    router.post('/cap-nhat-than-nhan/:id', ThuyenVienController.updateThanNhan);
    router.get('/them-thuyen-vien', ThuyenVienController.getAddThuyenVienForm);
    router.post('/them-thuyen-vien', ThuyenVienController.createNewThuyenVien);
    router.post('/xoa-thuyen-vien', ThuyenVienController.deleteThuyenVien);

    // Correct the route for viewing crew details
    router.get('/thuyen-vien/:id', ThuyenVienController.getThuyenVienById);
    router.get("/thuyenvien/export-word/:id", ThuyenVienController.exportThuyenvienContract);
    router.get('/thuyenvien/export-excel/:id', exportCV.exportCV);

    // user ở đây
    router.get('/danh-sach-user', UserController.getAllUser);
    router.post('/post-user', UserController.postUser);
    router.post('/edit-user', UserController.getEditUser);
    router.post('/put-user', UserController.putUser);
    router.post('/delete-user', UserController.deleteUser);
    router.post('/reset-user', UserController.resetPassword);
    router.get('/doi-mat-khau', (req, res) => {
        res.render('doimatkhau.ejs', { errors: [], success: null });
    });
    router.post('/doi-mat-khau', UserController.ChangePassword);


    //chứng chỉ ở đâyđây
    router.get('/danh-sach-chung-chi', ChungChiController.getAllChungChi);
    
    router.post('/post-chungchi', ChungChiController.postChungChi);
    router.post('/edit-chungchi', ChungChiController.getEditChungChi);
    router.post('/put-chungchi', ChungChiController.putChungChi);
    router.post('/delete-chungchi', ChungChiController.deleteChungChi);

    // Education routes
    router.post('/them-hoc-van', ThuyenVienController.createHocVan);
    router.post('/cap-nhat-hoc-van', ThuyenVienController.updateHocVan);
    router.get('/xoa-hoc-van/:id/:thuyenvien_id', ThuyenVienController.deleteHocVan);

    // Language certificate routes
    router.post('/them-ngoai-ngu', ThuyenVienController.createNgoaiNgu);
    router.post('/cap-nhat-ngoai-ngu', ThuyenVienController.updateNgoaiNgu);
    router.get('/xoa-ngoai-ngu/:id/:thuyenvien_id', ThuyenVienController.deleteNgoaiNgu);

    // Crew certificate routes
    router.post('/them-chung-chi', ThuyenVienController.createChungChi);
    router.post('/cap-nhat-chung-chi', ThuyenVienController.updateChungChi);
    router.get('/xoa-chung-chi/:id/:thuyenvien_id', ThuyenVienController.deleteChungChi);

    // Document routes
    router.post('/upload-tai-lieu/:id', ThuyenVienController.uploadTaiLieu);
    router.get('/xoa-tai-lieu/:id/:field', ThuyenVienController.deleteTaiLieuFile);

    // Certificate expiration routes
    router.get('/cer-expiring', ThuyenVienController.getExpiringCertificates);
    router.get('/cer-expired', ThuyenVienController.getExpiredCertificates);

    // Add status update route
    router.post('/cap-nhat-trang-thai/:id', ThuyenVienController.updateThuyenVienStatus);

    // Add photo upload route
    router.post('/upload-anh-thuyen-vien/:id', ThuyenVienController.uploadThuyenVienPhoto);
    // Add API endpoint to get all certificates
    router.get('/api/chung-chi', ThuyenVienController.getAllChungChi);

    // Add API endpoint to get crew members with specific certificates
    router.get('/api/crew-with-certificates', ThuyenVienController.getCrewWithCertificates);


    //hợp đồng ở đây
    router.get('/danh-sach-hop-dong', HopDongController.getAllHopDong);
    router.post('/post-hop-dong', HopDongController.postHopDong);
    router.post('/edit-hop-dong', HopDongController.puteditHopDong);
    router.post('/delete-hop-dong', HopDongController.deleteHopDong);
    router.get('/hop-dong-cho-thanh-ly', HopDongController.getHopDongChoThanhLy);
    router.post('/thuc-hien-thanh-ly', HopDongController.postThanhLyHopDong);
    router.get('/hop-dong-da-thanh-ly', HopDongController.getHopDongDaThanhLy);
    router.post('/hopdong/dat-hieu-luc', HopDongController.datHieuLuc);

    //thuyền viên bảng lương ở đây
    router.get('/danh-sach-thuyen-vien-luong', ThuyenVienLuongController.getAllThuyenVienLuong);
    router.post('/post-bangluong', ThuyenVienLuongController.postBangLuong);

    //bảng lương ở đây
    router.get('/danh-sach-bang-luong', BangLuongController.getAllBangLuong);
    router.post('/edit-bangluong', BangLuongController.getEditBangLuong);
    router.post('/delete-bangluong', BangLuongController.deleteBangLuong);
    router.get('/export-bang-luong', BangLuongController.exportBangLuong);

    //bảng lương chi tiết ở đây
    router.get('/bang-luong-chi-tiet', BangLuongChiTietController.getBangLuongChiTiet);
    router.post('/put-bangluong', BangLuongChiTietController.putBangLuong);
    router.post('/put-nganhang', BangLuongChiTietController.putNganHang);
    router.post('/xuly-thanhtoan', BangLuongChiTietController.xuLyThanhToan);

    //chức vụ ở đây
    router.get('/danh-sach-chuc-vu', ChucVuController.getAllChucVu);
    router.post('/post-chucvu', ChucVuController.postChucVu);
    router.get('/edit-chucvu', ChucVuController.getEditChucVu);
    router.post('/put-chucvu', ChucVuController.putChucVu);
    router.post('/delete-chucvu', ChucVuController.deleteChucVu);

    //tàu ở đây
    router.get('/danh-sach-tau', TauController.getAllTau);
    router.post('/post-tau', TauController.postTau);
    router.post('/edit-tau', TauController.getEditTau);
    router.post('/put-tau', TauController.putTau);
    router.post('/delete-tau', TauController.deleteTau);
    router.get('/search-tau', TauController.searchTau);

    app.use("/", router);


};

export default initWebRoutes;