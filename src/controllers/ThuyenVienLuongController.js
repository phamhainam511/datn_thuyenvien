import db from '../models';
import ThuyenVienLuongServices from "../services/ThuyenVienLuongServices";
let getAllThuyenVienLuong = async (req, res) => {
    let data = await ThuyenVienLuongServices.getAllThuyenVienLuong;
    return res.render('danhsach_thuyenvien_luong.ejs', {
        dataTable: data,
        formatTime: ThuyenVienLuongServices.formatTime
    });
};

module.exports = {
    getAllThuyenVienLuong: getAllThuyenVienLuong
}