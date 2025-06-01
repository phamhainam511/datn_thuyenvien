import db from '../models';
import TauServices from "../services/TauServices.js";
let getAllTau = async (req, res) => {
    let data = await TauServices.getAllTau();
    let comboLoaiTau = await TauServices.getComboLoaiTau();
    return res.render('danhsach_tau.ejs', {
        dataTable: data,
        dataLoaiTau: comboLoaiTau
    });
};

let postTau = async (req, res) => {
    let message = await TauServices.createNewTau(req.body);
    res.redirect('/danh-sach-tau');
}
let getEditTau = async (req, res) => {
    let tau_id = req.query.id;
    if (tau_id) {
        let tau_data = await TauServices.getTauId(tau_id);
        console.log(tau_data);
        return res.send('Tìm thấy tàu');
    } else {
        return res.send('Không tìm thấy tàu');
    }
}

let putTau = async (req, res) => {
    try {
        let data = req.body;
        await TauServices.updateTauData(data);
        return res.redirect('/danh-sach-tau');
    } catch (error) {
        res.send('Lỗi: ' + error.message);
    }
}

let deleteTau = async (req, res) => {
    let ids = req.body.id; 
    if (!Array.isArray(ids)) {
        ids = [ids]; 
    }

    for (let id of ids) {
        await TauServices.deleteTau(id);
    }

    return res.redirect('/danh-sach-tau');
};

let searchTau = async (req, res) => {
    try {
        let keyword = req.query.keyword || '';
        let taus = await TauServices.searchTau(keyword);
        let comboLoaiTau = await TauServices.getComboLoaiTau();
        return res.render('danhsach_tau.ejs', {
            dataTable: taus,
            dataLoaiTau: comboLoaiTau
        });
    } catch (e) {
        console.log(e);
        return res.send('Lỗi khi tìm kiếm tàu');
    }
};

module.exports = {
    getAllTau: getAllTau,
    postTau: postTau,
    getEditTau: getEditTau,
    putTau: putTau,
    deleteTau: deleteTau,
    searchTau: searchTau
}
