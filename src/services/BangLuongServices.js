import db from '../models/index';
const { Op } = require('sequelize');

let getAllBangLuong = async (keyword) => {
    return new Promise(async (resolve, reject) => {
        try {
            let whereTime = {};
            if (keyword) {
                const time = keyword.match(/^(\d{1,2})\/(\d{4})$/);
                if (time) {
                    const month = Number(time[1]);
                    const year = Number(time[2]);

                    const startDate = new Date(year, month - 1, 1);
                    const endDate = new Date(year, month, 0);

                    whereTime = {
                        thoigian: {
                            [Op.between]: [startDate, endDate]
                        }
                    };
                }
            }

            const bangluongs = await db.Bangluong.findAll({
                attributes: ['id_bangluong', 'thuyenvien_id', 'tongtien', 'thoigian', 'tinhtrang'],
                include: [
                    {
                        model: db.Thuyenvien,
                        as: 'thuyenvien',
                        include: [
                            {
                                model: db.Taikhoannganhang,
                                as: 'taikhoannganhang',
                                attributes: ['stk', 'tentaikhoan', 'tennganhang']
                            }
                        ]
                    }],
                where: whereTime,
                order: [
                    ['thuyenvien_id', 'ASC']
                ]
            });

            resolve(bangluongs);
        } catch (e) {
            reject(e);
        }
    })
};

let getComboTime = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let comboTime = await db.Bangluong.findAll({
                attributes: ['thoigian'],
                order: [['thoigian', 'DESC']]
            })
            let unique = new Set();

            comboTime.forEach(item => {
                const date = new Date(item.thoigian);
                const year = date.getFullYear();
                const month = (date.getMonth() + 1).toString();

                unique.add(`${month}/${year}`);
            });
            const result = Array.from(unique); //Lọc trùng
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

let getBangLuongId = (bangluong_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let bangluong = await db.Bangluong.findOne({
                where: { id: bangluong_id }
            })
            if (bangluong) {
                resolve(bangluong);
            } else {
                resolve([]);
            }
        } catch (e) {
            reject(e);
        }
    })
};

let deleteBangLuong = (bangluong_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let bangluong = await db.Bangluong.findOne({
                where: { id_bangluong: bangluong_id }
            })
            if (bangluong) {
                await bangluong.destroy();
            }
            resolve();
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getAllBangLuong: getAllBangLuong,
    getComboTime: getComboTime,
    getBangLuongId: getBangLuongId,
    deleteBangLuong: deleteBangLuong
}