import db from '../models';  
import ChungChiServices from "../services/ChungChiServices";
let getAllChungChi = async (req, res) => {
    let data = await ChungChiServices.getAllChungChi();
    return res.render('danhsach_chungchi.ejs', {
        dataTable : data
    });
};
let postChungChi = async (req, res) => {
    let message = await ChungChiServices.createNewChungChi(req.body);
    res.redirect('/danh-sach-chung-chi');
}
let getEditChungChi = async (req, res) => {
    let chungchi_id = req.query.id;
    if(chungchi_id){
        let chungchi_data = await ChungChiServices.getChungChiId(chungchi_id);
        console.log(chungchi_data);
        return res.send('Tìm thấy chứng chỉ');
    }else{
        return res.send('Không tìm thấy chứng chỉ');
    }
}

let putChungChi = async(req, res) => {
    try {
        let data = req.body;
        await ChungChiServices.updateChungChiData (data);
        return res.redirect('/danh-sach-chung-chi'); 
    } catch (error) {
        res.send('Lỗi: ' + error.message);
    }
}

let deleteChungChi = async (req, res) => {
    let ids = req.body.id; // => mảng id
    if (!Array.isArray(ids)) {
        ids = [ids]; // nếu gửi 1 id thì cho thành mảng luôn
    }

    for (let id of ids) {
        await ChungChiServices.deleteChungChi(id);
    }

    return res.redirect('/danh-sach-chung-chi');
};

let getAllLichSuDiTau = async (req, res) => {
    // let data = await ChungChiServices.getAllLichSuDiTau();
    // return res.render('thuyenvien_lichsu.ejs', {
    //     dataTable : data
    // });
    return res.render('thuyenvien_lichsu.ejs');
}

module.exports = {
    getAllChungChi : getAllChungChi,
    postChungChi: postChungChi,
    getEditChungChi: getEditChungChi,
    putChungChi: putChungChi,
    deleteChungChi: deleteChungChi,
    getAllLichSuDiTau: getAllLichSuDiTau
}
