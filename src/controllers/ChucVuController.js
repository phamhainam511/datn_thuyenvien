import db from '../models';
import ChucVuServices from "../services/ChucVuServices";
let getAllChucVu = async (req, res) => {
    let data = await ChucVuServices.getAllChucVu();
    return res.render('danhsach_chucvu.ejs', {
        dataTable: data
    });
};
let postChucVu = async (req, res) => {
    let message = await ChucVuServices.createNewChucVu(req.body);
    res.redirect('/danh-sach-chuc-vu');
}
let getEditChucVu = async (req, res) => {
    let chucvu_id = req.query.id;
    if (chucvu_id) {
        let chucvu_data = await ChucVuServices.getChucVuId(chucvu_id);
        console.log(chucvu_data);
        return res.send('Tìm thấy chức vụ');
    } else {
        return res.send('Không tìm thấy chức vụ');
    }
}

let putChucVu = async (req, res) => {
    try {
        let data = req.body;
        await ChucVuServices.updateChucVuData(data);
        return res.redirect('/danh-sach-chuc-vu');
    } catch (error) {
        res.send('Lỗi: ' + error.message);
    }
}

let deleteChucVu = async (req, res) => {
    let ids = req.body.id; 
    if (!Array.isArray(ids)) {
        ids = [ids]; 
    }

    for (let id of ids) {
        await ChucVuServices.deleteChucVu(id);
    }

    return res.redirect('/danh-sach-chuc-vu');
};

module.exports = {
    getAllChucVu: getAllChucVu,
    postChucVu: postChucVu,
    getEditChucVu: getEditChucVu,
    putChucVu: putChucVu,
    deleteChucVu: deleteChucVu
}
