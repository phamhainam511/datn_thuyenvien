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
        console.error("Lỗi khi lấy chi tiết bảng lương:", e);
        return res.status(500).send("Lỗi máy chủ. Không thể lấy dữ liệu chi tiết bảng lương.");
    }
};

let putBangLuong = async (req, res) => {
    try {
        let data = req.body;
        await BangLuongChiTietServices.updateBangLuongData(data);
        let id = data.id_bangluong;
        return res.redirect(`/bang-luong-chi-tiet?bangluong_id=${id}&updated=true`);
    } catch (error) {
        return res.redirect(`/bang-luong-chi-tiet?bangluong_id=${req.body.id_bangluong}&error=${msg}`);
    }
}

let putNganHang = async (req, res) => {
    try {
        let data = req.body;
        await BangLuongChiTietServices.updateNganHangData(data);
        let id = data.id_bangluong;
        return res.redirect(`/bang-luong-chi-tiet?bangluong_id=${id}&updated=true`);
    } catch (error) {
        const msg = encodeURIComponent(error.message);
        return res.redirect(`/bang-luong-chi-tiet?bangluong_id=${req.body.id_bangluong}&error=${msg}`);
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