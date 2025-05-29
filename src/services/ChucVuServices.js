import db from '../models/index';
const dataUtils = require('./ChuanHoaServices'); 

let createNewChucVu = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await db.Chucvu.create({
                tenchucvu: dataUtils.chuanHoaTen(data.tenchucvu),
            })
            let chungchi_ids = data.chungchi_id || [];
            if (!Array.isArray(chungchi_ids)) {
                chungchi_ids = [chungchi_ids];
            }
            for (let i = 0; i < chungchi_ids.length; i++) {
                await db.chucvuchungchi.create({
                    chucvu_id: result.id_chucvu,
                    chungchi_id: chungchi_ids[i]
                });
            }

            resolve(result);
        } catch (e) {
            reject(e);
        }
    })

}
let getAllChucVu = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let chucvus = db.Chucvu.findAll({
                raw: true,
            });
            resolve(chucvus);
        } catch (e) {
            reject(e);
        }
    })

}
let getChucVuId = (chucvu_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let chucvu = await db.Chucvu.findOne({
                where: { id: chucvu_id }
            })
            if (chucvu) {
                resolve(chucvu);
            } else {
                resolve([]);
            }
        } catch (e) {
            reject(e);
        }
    })
}

let updateChucVuData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Chucvu.update(
                {
                    tenchucvu: data.tenchucvu,
                },
                {
                    where: { id_chucvu: data.id_chucvu }
                }
            );
            resolve('Cập nhật thành công!');
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
}
let deleteChucVu = (chucvu_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let chucvu = await db.Chucvu.findOne({
                where: { id_chucvu: chucvu_id }
            })
            if (chucvu) {
                await chucvu.destroy();
            }
            resolve();
        } catch (e) {
            reject(e);
        }
    })
}
let getComboChungChi = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let chungchis = db.Chungchi.findAll({
                attributes: ['id_chungchi', 'tenchungchi'],
            });
            resolve(chungchis);
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    createNewChucVu: createNewChucVu,
    getAllChucVu: getAllChucVu,
    getChucVuId: getChucVuId,
    updateChucVuData: updateChucVuData,
    deleteChucVu: deleteChucVu,
    getComboChungChi: getComboChungChi
}