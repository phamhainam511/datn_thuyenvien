import db from '../models/index';
const moment = require('moment');
const { Op } = require('sequelize');

let createNewThuyenVienLuong = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await db.Tau.create({
                tentau: data.tentau,
                quoctich: data.quoctich,
                loaitau_id: data.loaitau_id
            })
            resolve(result);
        } catch (e) {
            reject(e);
        }
    })

}

let getAllThuyenVienLuong = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let thuyenviens = await db.Thuyenvien.findAll({
                attributes: ['id_thuyenvien', 'hoten'],
                include: [
                    {
                        model: db.Lichsuditau,
                        as: 'lichsuditau',
                        attributes: ['timexuatcanh', 'timelentau', 'ngayroitau']
                    },
                    {
                        model: db.Bangluong,
                        as: 'bangluong',
                        attributes: ['thuyenvien_id', 'thoigian']
                    }
                ],
            });
            resolve(thuyenviens);
        } catch (e) {
            reject(e);
        }
    });
};

function formatTime(time) {
    const date = new Date(time);
    const thang = date.getMonth() + 1;
    const nam = date.getFullYear();
    return `Tháng ${thang}/${nam}`;
}

module.exports = {
    getAllThuyenVienLuong: getAllThuyenVienLuong,
    formatTime: formatTime
}