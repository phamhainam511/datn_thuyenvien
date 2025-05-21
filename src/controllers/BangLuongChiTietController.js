import BangLuongChiTietServices from "../services/BangLuongChiTietServices";
import BangLuongFunctionServices from '../services/BangLuongFunctionServices';

let getBangLuongChiTiet = async (req, res) => {
    try {
        let bangluong_id = req.query.bangluong_id;
        let bangluongs = await BangLuongChiTietServices.getBangLuongChiTiet(bangluong_id);
        return res.render('bangluong_chitiet.ejs', {
            dataTable: bangluongs,
            formatTime: BangLuongFunctionServices.formatTime,
            formatDecimal: BangLuongFunctionServices.formatDecimal,
        });
    } catch (e) {
        console.log(e);
        return res.send('Lỗi khi hiển thị chi tiết bảng lương');
    }
};

let putBangLuong = async (req, res) => {
    try {
        let data = req.body;
        await BangLuongChiTietServices.updateBangLuongData(data);
        let id = data.id_bangluong;
        return res.redirect(`/bang-luong-chi-tiet?bangluong_id=${id}`);
    } catch (error) {
        res.send('Lỗi: ' + error.message);
    }
}

let putNganHang = async (req, res) => {
    try {
        let data = req.body;
        await BangLuongChiTietServices.updateNganHangData(data);
        let id = data.id_bangluong;
        return res.redirect(`/bang-luong-chi-tiet?bangluong_id=${id}`);
    } catch (error) {
        res.send('Lỗi: ' + error.message);
    }
}

let xuLyThanhToan = async (req, res) => {
    try {
        let data = req.body.bangluong_id;
        await BangLuongChiTietServices.xuLyThanhToan(data);
        return res.redirect(`/bang-luong-chi-tiet?bangluong_id=${data}`);
    } catch (error) {
        res.send('Lỗi: ' + error.message);
    }
}

module.exports = {
    getBangLuongChiTiet: getBangLuongChiTiet,
    putBangLuong: putBangLuong,
    putNganHang: putNganHang,
    xuLyThanhToan
}