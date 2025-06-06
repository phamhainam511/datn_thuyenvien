import ChungChiServices from "../services/ChungChiServices.js";
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
    let ids = req.body.id;

    if (!Array.isArray(ids)) {
        ids = [ids]; 
    }

    try {
        for (let id of ids) {
            const deleted = await ChungChiServices.deleteChungChi(id);
            if (!deleted) {
                return res.status(400).json({
                    message: `Không thể xóa chứng chỉ với ID: ${id}`
                });
            }
        }

        return res.status(200).json({
            message: 'Thành công: xoá chứng chỉ thành công'
        });
    } catch (err) {
        console.error('Lỗi khi xóa chứng chỉ:', err);
        return res.status(500).json({
            message: 'Đã xảy ra lỗi khi xóa chứng chỉ.'
        });
    }
};



let getAllLichSuDiTau = async (req, res) => {
    // let data = await ChungChiServices.getAllLichSuDiTau();
    // return res.render('thuyenvien_lichsu.ejs', {
    //     dataTable : data
    // });
    return res.render('thuyenvien_lichsu.ejs');
}

const ChungChiController = {
    getAllChungChi,
    postChungChi,
    getEditChungChi,
    putChungChi,
    deleteChungChi,
    getAllLichSuDiTau
}

export default ChungChiController;
