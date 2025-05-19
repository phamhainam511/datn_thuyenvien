import db from '../models/index';
const {
    Op
} = require('sequelize');
let getAllHopDong = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let hopdongs = await db.Hopdong.findAll({
                where: {
                    trangthaihopdong: 'Có hiệu lực' // Chỉ lấy hợp đồng có trạng thái này
                },
                include: [{
                    model: db.Thuyenvien,
                    as: 'thuyenvien',
                    attributes: ['id_thuyenvien', 'hoten']
                }],
                raw: true,
                nest: true
            });
            resolve(hopdongs);
        } catch (e) {
            reject(e);
        }
    });
};

let getHopDongChoThanhLy = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let hopdongs = await db.Hopdong.findAll({
                where: {
                    trangthaihopdong: 'Chờ thanh lý' // Chỉ lấy hợp đồng có trạng thái này
                },
                include: [{
                    model: db.Thuyenvien,
                    as: 'thuyenvien',
                    attributes: ['id_thuyenvien', 'hoten']
                }],
                raw: true,
                nest: true
            });
            resolve(hopdongs);
        } catch (e) {
            reject(e);
        }
    });
};

let getHopDongDaThanhLy = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let hopdongs = await db.Hopdong.findAll({
                where: {
                    trangthaihopdong: 'Đã thanh lý' // Chỉ lấy hợp đồng có trạng thái này
                },
                include: [{
                    model: db.Thuyenvien,
                    as: 'thuyenvien',
                    attributes: ['id_thuyenvien', 'hoten']
                }],
                raw: true,
                nest: true
            });
            resolve(hopdongs);
        } catch (e) {
            reject(e);
        }
    });
};

const parseDate = (str) => {
    if (!str) return null;

    if (str.includes('/')) {
        // Định dạng dd/MM/yyyy
        const parts = str.split('/');
        if (parts.length !== 3) return null;
        const [day, month, year] = parts;
        const date = new Date(`${year}-${month}-${day}`);
        if (isNaN(date.getTime())) return null;
        return date;
    } else if (str.includes('-')) {
        // Định dạng yyyy-MM-dd hoặc yyyy-M-d
        const date = new Date(str);
        if (isNaN(date.getTime())) return null;
        return date;
    } else {
        // Định dạng không xác định
        return null;
    }
};

let createNewHopDong = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('Tạo hợp đồng với:', data);

            const thuyenVien = await db.Thuyenvien.findOne({
                where: {
                    id_thuyenvien: data.thuyenvien_id
                }
            });

            if (!thuyenVien) {
                return reject(new Error('Thuyền viên không tồn tại!'));
            }

            const existingHopDong = await db.Hopdong.findOne({
                where: {
                    thuyenvien_id: data.thuyenvien_id,
                    trangthaihopdong: {
                        [Op.in]: ['có hiệu lực', 'chờ thanh lý']
                    }
                }
            });

            if (existingHopDong) {
                return reject(new Error('Thuyền viên đã có hợp đồng đang hiệu lực hoặc chờ thanh lý!'));
            }

            const ngayky = parseDate(data.ngayky);
            const ngayhethan = parseDate(data.ngayhethan);

            if (!ngayky || !ngayhethan || isNaN(ngayky) || isNaN(ngayhethan)) {
                return reject(new Error('Ngày ký hoặc hết hạn không hợp lệ!'));
            }

            if (ngayky >= ngayhethan) {
                return reject(new Error('Ngày ký phải trước ngày hết hạn!'));
            }

            const result = await db.Hopdong.create({
                thuyenvien_id: data.thuyenvien_id,
                ngayky,
                ngayhethan,
                trangthaihopdong: data.trangthaihopdong,
                hinhanh: data.hinhanh
            });

            resolve(result);

        } catch (e) {
            console.log('🔥 Lỗi Sequelize:', e);
            reject(e);
        }
    });
};



let getHopDongById = (hopdong_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hopdong = await db.Hopdong.findOne({
                where: {
                    id_hopdong: hopdong_id
                }
            })
            if (hopdong) {
                resolve(hopdong);
            } else {
                resolve([]);
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteHopDong = (hopdong_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hopdong = await db.Hopdong.findOne({
                where: {
                    id_hopdong: hopdong_id
                }
            })
            if (hopdong) {
                await hopdong.destroy();
            }
            resolve();
        } catch (e) {
            reject(e);
        }
    })
}

let updateHopDongData = async (data, file) => {
    try {
        const thuyenVien = await db.Thuyenvien.findOne({
            where: {
                id_thuyenvien: data.thuyenvien_id
            },
        });

        if (!thuyenVien) {
            throw new Error('Thuyền viên không tồn tại!');
        }
        // Chuyển đổi ngày từ string "dd/MM/yyyy" sang Date object
        const ngayky = parseDate(data.ngayKi);
        const ngayhethan = parseDate(data.ngayHetHan);

        if (ngayky >= ngayhethan) {
                return reject(new Error('Ngày ký hợp đồng phải trước ngày hết hạn!'));
        }

        await db.Hopdong.update({
            thuyenvien_id: data.thuyenvien_id,
            ngayky,
            ngayhethan,
            hinhanh: data.hinhanh,
        }, {
            where: {
                id_hopdong: data.idHopDong
            },
        });

        return 'Cập nhật hợp đồng thành công!';
    } catch (e) {
        console.error(e);
        throw e;
    }
};

let updatethanhLyHopDong = async (idHopDong) => {
    if (!idHopDong) {
        throw new Error('Thiếu ID hợp đồng');
    }

    await db.Hopdong.update({
        trangthaihopdong: 'Đã thanh lý',
        ngaythanhly: new Date()
    }, {
        where: {
            id_hopdong: idHopDong
        }
    });

    return 'Thanh lý hợp đồng thành công!';
}

module.exports = {
    getAllHopDong: getAllHopDong,
    createNewHopDong: createNewHopDong,
    getHopDongById: getHopDongById,
    updateHopDongData: updateHopDongData,
    deleteHopDong: deleteHopDong,
    getHopDongChoThanhLy: getHopDongChoThanhLy,
    updatethanhLyHopDong: updatethanhLyHopDong,
    getHopDongDaThanhLy: getHopDongDaThanhLy,
}