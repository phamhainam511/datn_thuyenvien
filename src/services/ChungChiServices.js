import * as db from '../models/index.js';
const dataUtils = require('./ChuanHoaServices.js'); 
let createNewChungChi = async(data) => {
    return new Promise(async(resolve, reject) => {
        try {
            const result = await db.Chungchi.create({
                tenchungchi: dataUtils.chuanHoaTen(data.tenchungchi),
                tieuchuanapdung: dataUtils.chuanHoaTen(data.tieuchuanapdung)
            })
            resolve(result);
        }catch (e){
            reject(e);
        }
    })

}
let getAllChungChi = () => {
    return new Promise(async(resolve, reject) => {
        try{
            let chungchis = db.Chungchi.findAll({
                raw:true,
            });
            resolve(chungchis);
        }catch(e){
            reject(e);
        }
    })
    
}
let getChungChiId = (chungchi_id) => {
    return new Promise (async(resolve, reject) => {
        try {
            let chungchi = await db.Chungchi.findOne({
                where : {id : chungchi_id}
            })
            if (chungchi){
                resolve (chungchi);
            }else {
                resolve ([]);
            }
        }catch(e){
            reject(e);
        }
    })
}

let updateChungChiData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Chungchi.update(
                {
                    tenchungchi: dataUtils.chuanHoaTen(data.tenchungchi),
                    tieuchuanapdung: dataUtils.chuanHoaTen(data.tieuchuanapdung)
                },
                {
                    where: { id_chungchi: data.id_chungchi }
                }
            );
            resolve('Cập nhật thành công!');
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
}
let deleteChungChi = (chungchi_id) => {
    return new Promise(async (resolve, reject) => {
        try{
            let chungchi = await db.Chungchi.findOne({
                where: {id_chungchi:chungchi_id}
            })
            if(chungchi ){
                await chungchi.destroy();
                return resolve(true);
            }
            return resolve(false);
        }catch(e){
            reject(e);
        }
    })
}

let getAllLichSuDiTau = () => {
    return new Promise(async(resolve, reject) => {
        try{
            let lichsuditau = db.LichSuDiTau.findAll({
                raw:true,
            });
            resolve(lichsuditau);
        }catch(e){
            reject(e);
        }
    })
    
}

module.exports = {
    createNewChungChi: createNewChungChi,
    getAllChungChi : getAllChungChi,
    getChungChiId : getChungChiId,
    updateChungChiData: updateChungChiData,
    deleteChungChi: deleteChungChi,
    getAllLichSuDiTau: getAllLichSuDiTau
}