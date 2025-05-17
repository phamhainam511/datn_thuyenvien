import express from "express";
import ChungChiController from '../controllers/ChungChiController';
import UserController from '../controllers/UserController';
import ThuyenVienController from '../controllers/ThuyenVienController';
const router = express.Router();

const initWebRoutes = (app) => {

    //thuyền viên ở đây
    router.post('/them-lich-su-di-tau', ThuyenVienController.createLichSuDiTau);
    router.post('/cap-nhat-lich-su-di-tau', ThuyenVienController.updateLichSuDiTau);
    router.get('/danh-sach-thuyen-vien', ThuyenVienController.getAllThuyenVien);
    router.get('/danh-sach-thuyen-vien/:id', ThuyenVienController.getThuyenVienById);
    router.post('/cap-nhat-thuyen-vien/:id', ThuyenVienController.putThuyenVien);
    router.post('/cap-nhat-than-nhan/:id', ThuyenVienController.updateThanNhan);
    
    // Correct the route for viewing crew details
    router.get('/thuyen-vien/:id', ThuyenVienController.getThuyenVienById);
    
    // user ở đây
    router.get('/danh-sach-user', UserController.getAllUser);
    
    //chứng chỉ ở đâyđây
    router.get('/danh-sach-chung-chi', ChungChiController.getAllChungChi);
    router.get('/lich-su-di-tau', ChungChiController.getAllLichSuDiTau);
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
    
    app.use("/", router);
};

export default initWebRoutes;