import db from '../models/index';

// let createNewBangLuong = async (data) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const result = await db.Bangluong.create({
//                 thuyenvien_id: data.thuyenvien_id,
//                 luongcb: data.luongcb,
//                 tigia: data.tigia,
//                 socong: data.socong,
//                 thoigian: new Date(),
//                 phuongthuc: data.phuongthuc,
//                 tinhtrang: data.tinhtrang
//             })
//             resolve(result);
//         } catch (e) {
//             reject(e);
//         }
//     })

// }
let getAllBangLuong = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let bangluongs = await db.Bangluong.findAll({
                attributes: ['id_bangluong', 'thuyenvien_id', 'luongcb', 'tigia', 'socong', 'thoigian', 'phuongthuc', 'tinhtrang'],
                include: [
                    {
                        model: db.Thuyenvien,
                        as: 'thuyenvien',
                        attributes: ['hoten']
                    }
                ]
            });
            resolve(bangluongs);
        } catch (e) {
            reject(e);
        }
    })

}

let getComboTime = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let comboTime = await db.Bangluong.findAll({
                attributes: ['thoigian'],
                order: [['thoigian', 'DESC']]
            })
            let unique = new Set();

            comboTime.forEach(item => {
                unique.add(formatTime(item.thoigian));
            });
            const result = Array.from(unique); // Mảng đã loại trùng
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
}

// let updateBangLuongData = (data) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             await db.Bangluong.update(
//                 {
//                     thuyenvien_id: data.thuyenvien_id,
//                     luongcb: data.luongcb,
//                     tigia: data.tigia,
//                     socong: data.socong,
//                     phuongthuc: data.phuongthuc,
//                     tinhtrang: data.tinhtrang
//                 },
//                 {
//                     where: { id_bangluong: data.id_bangluong }
//                 }
//             );
//             resolve('Cập nhật thành công!');
//         } catch (e) {
//             console.log(e);
//             reject(e);
//         }
//     });
// }
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

function formatTime(time) {
    const date = new Date(time);
    const thang = date.getMonth() + 1;
    const nam = date.getFullYear();
    return `Tháng ${thang}/${nam}`;
}

let searchBangLuong = async (keyword = '') => {
    return new Promise(async (resolve, reject) => {
        try {
            const taus = await db.BangLuong.findAll({
                attributes: ['id_tau', 'tentau', 'quoctich', 'loaitau_id'],
                include: [
                    {
                        model: db.Loaitau,
                        as: 'loaitau',
                        attributes: ['tenloaitau'],
                        required: false
                    }
                ],
                where: {
                    [Op.or]: [
                        { tentau: { [Op.like]: `%${keyword}%` } },
                        { quoctich: { [Op.like]: `%${keyword}%` } },
                        Sequelize.where(
                            Sequelize.col('loaitau.tenloaitau'),
                            {
                                [Op.like]: `%${keyword}%`
                            }
                        )
                    ]
                }
            });

            resolve(taus);
        } catch (e) {
            reject(e);
        }
    })
};


module.exports = {
    // createNewBangLuong: createNewBangLuong,
    getAllBangLuong: getAllBangLuong,
    getComboTime: getComboTime,
    getBangLuongId: getBangLuongId,
    // updateBangLuongData: updateBangLuongData,
    deleteBangLuong: deleteBangLuong,
    formatTime: formatTime
}