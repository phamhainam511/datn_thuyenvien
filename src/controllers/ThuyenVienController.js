import db from '../models';  
import ThuyenVienServices from "../services/ThuyenVienServices";
let getAllThuyenVien = async (req, res) => {
    let data = await ThuyenVienServices.getAllThuyenVien();
    return res.render('danhsach_thuyenvien.ejs', {
        dataTable : data
    });
};
let postThuyenVien = async (req, res) => {
    let message = await ThuyenVienServices.createNewThuyenVien(req.body);
    res.redirect('/danh-sach-thuyen-vien');
}
let getEditThuyenVien = async (req, res) => {
    let ThuyenVien_id = req.query.id;
    if(ThuyenVien_id){
        let ThuyenVien_data = await ThuyenVienServices.getThuyenVienId(ThuyenVien_id);
        console.log(ThuyenVien_data);
        return res.send('Tìm thấy thuyền viên');
    }else{
        return res.send('Không tìm thấy thuyền viên');
    }
}

let putThuyenVien = async(req, res) => {
    try {
        let data = req.body;
        await ThuyenVienServices.updateThuyenVienData(req.params.id, data);
        return res.redirect('/danh-sach-thuyen-vien');
    } catch (error) {
        res.send('Lỗi: ' + error.message);
    }
}

let updateThanNhan = async(req, res) => {
    try {
        let data = req.body;
        let thuyenvien_id = req.params.id;
        await ThuyenVienServices.updateThanNhanData(thuyenvien_id, data);
        return res.redirect('/thuyen-vien/' + thuyenvien_id);
    } catch (error) {
        res.send('Lỗi: ' + error.message);
    }
}

let deleteThuyenVien = async (req, res) => {
    let ids = req.body.id; // => mảng id
    if (!Array.isArray(ids)) {
        ids = [ids]; // nếu gửi 1 id thì cho thành mảng luôn
    }

    for (let id of ids) {
        await ThuyenVienServices.deleteThuyenVien(id);
    }

    return res.redirect('/danh-sach-thuyen-vien');
};

let getThuyenVienById = async (req, res) => {
    let thuyenvien_id = req.params.id;
    if(thuyenvien_id){
        let thuyenvien_data = await ThuyenVienServices.getThuyenVienId(thuyenvien_id);
        let nhanthanthuyenvien_data = await ThuyenVienServices.getNhanThanThuyenVien(thuyenvien_id);

        return res.render('thuyenvien_chitiet.ejs', {
            thuyenvieninfo : thuyenvien_data,
            nhanthanthuyenvieninfo : nhanthanthuyenvien_data
        });
    }
    else{
        return res.send('Không tìm thấy thuyền viên');
    }
}

module.exports = {
    getAllThuyenVien : getAllThuyenVien,
    postThuyenVien: postThuyenVien,
    getEditThuyenVien: getEditThuyenVien,
    putThuyenVien: putThuyenVien,
    deleteThuyenVien: deleteThuyenVien,
    getThuyenVienById: getThuyenVienById,
    updateThanNhan: updateThanNhan
}
