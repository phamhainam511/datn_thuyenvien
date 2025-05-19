import db from '../models/index';

let createNewChucVu = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await db.Chucvu.create({
                tenchucvu: data.tenchucvu,
                capbac: data.capbac
            })
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
                    capbac: data.capbac
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
module.exports = {
    createNewChucVu: createNewChucVu,
    getAllChucVu: getAllChucVu,
    getChucVuId: getChucVuId,
    updateChucVuData: updateChucVuData,
    deleteChucVu: deleteChucVu
}