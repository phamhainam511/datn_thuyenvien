import * as db from '../models/index.js';
const moment = require('moment');
const { Op } = require('sequelize');

let createNewBangLuong = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await db.Bangluong.create({
                thuyenvien_id: data.id_thuyenvien,
                luongcb: data.luongcb,
                tigia: data.tigia,
                socong: data.socong,
                tongtien: data.tongtien,
                thoigian: new Date(),
                phuongthuc: data.phuongthuc,
                tinhtrang: 'Chưa thanh toán'
            })
            resolve(result);
        } catch (e) {
            reject(e);
        }
    })

}

let getAllThuyenVienLuong = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const now = new Date();
            const currentMonth = now.getMonth() + 1;
            const currentYear = now.getFullYear();
            let data = await db.Thuyenvien.findAll({
                attributes: ['id_thuyenvien', 'hoten'],
                include: [
                    {
                        model: db.Lichsuditau,
                        as: 'lichsuditau',
                        attributes: ['timexuatcanh', 'timelentau', 'ngayroitau', 'chucvu_id'],
                        limit: 1,       // Lấy 1 dòng
                        separate: true,
                        order: [['timexuatcanh', 'DESC']],
                        include: [
                            {
                                model: db.Chucvu,
                                as: 'chucvu',
                                attributes: ['tenchucvu']
                            }
                        ],
                    },
                    {
                        model: db.Bangluong,
                        as: 'bangluong',
                        attributes: ['thoigian']
                    }
                ],
            });

            const filter = data.filter(tv => {
                const lichsu = tv.lichsuditau[0];
                if (!lichsu || !lichsu.timexuatcanh) {
                    return false;
                }

                const xuatcanh = new Date(lichsu.timexuatcanh);
                const startDate = new Date(xuatcanh.getFullYear(), xuatcanh.getMonth(), 1);

                let endDate;
                if (lichsu.ngayroitau) {
                    const roitau = new Date(lichsu.ngayroitau);
                    endDate = new Date(roitau.getFullYear(), roitau.getMonth() + 1, 0);
                    if (now < startDate || now > endDate) return false;
                } else {
                    if (now < startDate) return false;
                }

                const dsbangluong = tv.bangluong;
                if (!dsbangluong || dsbangluong.length === 0) {
                    return true;
                }
                const bangluong = tv.bangluong.some(bl => {
                    const time = new Date(bl.thoigian);
                    const month = time.getMonth() + 1;

                    const year = time.getFullYear();
                    return month === currentMonth && year === currentYear
                });
                return !bangluong;
            });
            resolve(filter);
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    getAllThuyenVienLuong: getAllThuyenVienLuong,
    createNewBangLuong: createNewBangLuong
}