import db from '../models';
import BangLuongServices from "../services/BangLuongServices";

let getAllBangLuong = async (req, res) => {
    let data = await BangLuongServices.getAllBangLuong();
    let comboTime = await BangLuongServices.getComboTime();
    return res.render('danhsach_bangluong.ejs', {
        dataTable: data,
        dataTime: comboTime,
        formatTime: BangLuongServices.formatTime
    });
};
// let postBangLuong = async (req, res) => {
//     let message = await BangLuongServices.createNewBangLuong(req.body);
//     res.redirect('/danh-sach-bang-luong');
// }
let getEditBangLuong = async (req, res) => {
    let bangluong_id = req.query.id;
    if (bangluong_id) {
        let bangluong_data = await BangLuongServices.getBangLuongId(bangluong_id);
        console.log(bangluong_data);
        return res.send('Tìm thấy bảng lương');
    } else {
        return res.send('Không tìm thấy bảng lương');
    }
}

// let putBangLuong = async (req, res) => {
//     try {
//         let data = req.body;
//         await BangLuongServices.updateBangLuongData(data);
//         return res.redirect('/danh-sach-bang-luong');
//     } catch (error) {
//         res.send('Lỗi: ' + error.message);
//     }
// }

let deleteBangLuong = async (req, res) => {
    let ids = req.body.id; // => mảng id
    if (!Array.isArray(ids)) {
        ids = [ids]; // nếu gửi 1 id thì cho thành mảng luôn
    }

    for (let id of ids) {
        await BangLuongServices.deleteBangLuong(id);
    }

    return res.redirect('/danh-sach-bang-luong');
};

module.exports = {
    getAllBangLuong: getAllBangLuong,
    // postBangLuong: postBangLuong,
    getEditBangLuong: getEditBangLuong,
    // putBangLuong: putBangLuong,
    deleteBangLuong: deleteBangLuong
}