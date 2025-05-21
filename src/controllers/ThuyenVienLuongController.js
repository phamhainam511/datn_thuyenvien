import db from '../models';
import ThuyenVienLuongServices from "../services/ThuyenVienLuongServices";
import BangLuongFunctionServices from '../services/BangLuongFunctionServices';

let getAllThuyenVienLuong = async (req, res) => {
    let data = await ThuyenVienLuongServices.getAllThuyenVienLuong();
    return res.render('danhsach_thuyenvien_luong.ejs', {
        dataTable: data,
        formatTime: BangLuongFunctionServices.formatTime
    });
};

let postBangLuong = async (req, res) => {
    let message = await ThuyenVienLuongServices.createNewBangLuong(req.body);
    res.redirect('/danh-sach-thuyen-vien-luong');
}

module.exports = {
    getAllThuyenVienLuong: getAllThuyenVienLuong,
    postBangLuong: postBangLuong
}