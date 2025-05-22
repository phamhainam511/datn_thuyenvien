import BangLuongServices from "../services/BangLuongServices";
import BangLuongFunctionServices from '../services/BangLuongFunctionServices';

let getAllBangLuong = async (req, res) => {
    try {
        let comboTime = await BangLuongServices.getComboTime();
        let keyword = req.query.keyword || comboTime[0];
        let bangluongs = await BangLuongServices.getAllBangLuong(keyword);
        return res.render('danhsach_bangluong.ejs', {
            dataTable: bangluongs,
            dataTime: comboTime,
            formatTime: BangLuongFunctionServices.formatTime,
            formatDecimal: BangLuongFunctionServices.formatDecimal,
            keyword: keyword
        });
    } catch (e) {
        console.log(e);
        return res.send('Lỗi khi hiển thị bảng lương theo tháng');
    }
};

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

let exportBangLuong = async (req, res) => {
    try {
        const time = req.query.time || comboTime[0];
        const dataTable = await BangLuongServices.getAllBangLuong(time);
        const workbook = await BangLuongServices.exportBangLuong(dataTable, time);

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=bang_luong_${time.replace('/', '_')}.xlsx`);

        await workbook.xlsx.write(res);
        res.end();
    } catch (e) {
        console.log(e);
        return res.send('Lỗi xuất Excel');
    }
};

module.exports = {
    getAllBangLuong: getAllBangLuong,
    getEditBangLuong: getEditBangLuong,
    deleteBangLuong: deleteBangLuong,
    exportBangLuong: exportBangLuong
}