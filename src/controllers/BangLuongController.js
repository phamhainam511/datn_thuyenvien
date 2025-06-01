import BangLuongServices from "../services/BangLuongServices.js";
import BangLuongFunctionServices from '../services/BangLuongFunctionServices.js';

// Lấy danh sách bảng lương theo tháng (hoặc mặc định là tháng mới nhất)
let getAllBangLuong = async (req, res) => {
    try {
        let comboTime = await BangLuongServices.getComboTime(); // Danh sách tháng để lọc
        let keyword = req.query.keyword || comboTime[0]; // Mặc định là tháng đầu tiên nếu không có keyword
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
// Lấy dữ liệu bảng lương theo ID để xử lý chỉnh sửa (chưa render, chỉ test)
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
    let ids = req.body.id; 
    if (!Array.isArray(ids)) {
        ids = [ids]; 
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
        // Thiết lập header để trình duyệt hiểu đây là file Excel
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=bang_luong_${time.replace('/', '_')}.xlsx`);

        await workbook.xlsx.write(res);
        res.end();
    } catch (e) {
        console.log(e);
        return res.send('Lỗi xuất Excel');
    }
};

const BangLuongController = {
    getAllBangLuong,
    getEditBangLuong,
    deleteBangLuong,
    exportBangLuong
}

export default BangLuongController;