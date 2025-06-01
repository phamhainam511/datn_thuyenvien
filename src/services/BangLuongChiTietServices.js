import db from '../models/index.js';

let getBangLuongChiTiet = async (bangluong_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let chitiet = await db.Bangluong.findOne({
                attributes: ['id_bangluong', 'thuyenvien_id', 'luongcb', 'tigia', 'socong', 'tongtien', 'thoigian', 'phuongthuc', 'tinhtrang'],
                include: [
                    {
                        model: db.Thuyenvien,
                        as: 'thuyenvien',
                        attributes: ['hoten'],
                        include: [
                            {
                                model: db.Taikhoannganhang,
                                as: 'taikhoannganhang',
                                attributes: ['stk', 'tentaikhoan', 'tennganhang']
                            }
                        ],
                    }],
                where: {
                    id_bangluong: bangluong_id
                }
            });
            resolve(chitiet);
        } catch (e) {
            reject(e);
        }
    });
};

let updateBangLuongData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Bangluong.update(
                {
                    luongcb: data.luongcb,
                    tigia: data.tigia,
                    tongtien: data.tongtien,
                    phuongthuc: data.phuongthuc,
                },
                {
                    where: { id_bangluong: data.id_bangluong }
                }
            );
            resolve('Cập nhật thành công!');
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
}

let updateNganHangData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Taikhoannganhang.update(
                {
                    tennganhang: data.tennganhang,
                    stk: data.stk,
                    tentaikhoan: data.tentaikhoan,
                },
                {
                    where: { thuyenvien_id: data.thuyenvien_id }
                }
            );
            resolve('Cập nhật thành công!');
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
}

let xuLyThanhToan = (bangluong_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Bangluong.findOne(
                {
                    where: { id_bangluong: bangluong_id }
                }
            );
            if (!data) {
                return reject("Không tìm thấy bản ghi bảng lương.");
            }

            let newTrangThai = (data.tinhtrang === "Đã thanh toán") ? "Chưa thanh toán" : "Đã thanh toán";
            await db.Bangluong.update(
                {
                    tinhtrang: newTrangThai
                },
                {
                    where: { id_bangluong: bangluong_id }
                }
            );
            resolve('Cập nhật thành công!');
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
}

const BangLuongChiTietServices = {
    getBangLuongChiTiet,
    updateBangLuongData,
    updateNganHangData,
    xuLyThanhToan
}
export default BangLuongChiTietServices;