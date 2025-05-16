import db from '../models/index';

let createNewThuyenVien = async(data) => {
    return new Promise(async(resolve, reject) => {
        try {
            const result = await db.Thuyenvien.create({
                tenthuyenvien: data.tenthuyenvien,
                tieuchuanapdung: data.tieuchuanapdung
            })
            resolve(result);
        }catch (e){
            reject(e);
        }
    })

}
let getAllThuyenVien = () => {
    return new Promise(async(resolve, reject) => {
        try{
            let thuyenviens = db.Thuyenvien.findAll({
                raw:true,
            });
            resolve(thuyenviens);
        }catch(e){
            reject(e);
        }
    })
    
}
let getThuyenVienId = (thuyenvien_id) => {
    return new Promise (async(resolve, reject) => {
        try {
            let thuyenvien = await db.Thuyenvien.findOne({
                where : {id_thuyenvien : thuyenvien_id}
            })
            if (thuyenvien){
                resolve (thuyenvien);
            }else {
                resolve ([]);
            }
        }catch(e){
            reject(e);
        }
    })
}

let updateThuyenVienData = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Thuyenvien.update(
                data,
                {
                    where: { id_thuyenvien: id }
                }
            );
            resolve('Cập nhật thành công!');
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
}
let deleteThuyenVien = (thuyenvien_id) => {
    return new Promise(async (resolve, reject) => {
        try{
            let thuyenvien = await db.Thuyenvien.findOne({
                where: {id_thuyenvien:thuyenvien_id}
            })
            if(thuyenvien ){
                await thuyenvien.destroy();
            }
            resolve();
        }catch(e){
            reject(e);
        }
    })
}

let getNhanThanThuyenVien = (thuyenvien_id) => {
    return new Promise (async(resolve, reject) => {
        try {
            let nhanthanthuyenvien = await db.Thannhan.findOne({
                where : {thuyenvien_id : thuyenvien_id}
            })
            if (nhanthanthuyenvien){
                resolve (nhanthanthuyenvien);
            }else {
                resolve ({});
            }
        }catch(e){
            reject(e);
        }
    })
}

let updateThanNhanData = (thuyenvien_id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // First check if a record exists
            let existingRecord = await db.Thannhan.findOne({
                where: { thuyenvien_id: thuyenvien_id }
            });
            
            if (existingRecord) {
                // Update existing record
                await db.Thannhan.update(
                    data,
                    {
                        where: { thuyenvien_id: thuyenvien_id }
                    }
                );
            } else {
                // Create new record if doesn't exist
                data.thuyenvien_id = thuyenvien_id;
                await db.Thannhan.create(data);
            }
            
            resolve('Cập nhật thông tin gia đình thành công!');
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
}

module.exports = {
    createNewThuyenVien: createNewThuyenVien,
    getAllThuyenVien : getAllThuyenVien,
    getThuyenVienId : getThuyenVienId,
    updateThuyenVienData: updateThuyenVienData,
    deleteThuyenVien: deleteThuyenVien,
    getNhanThanThuyenVien: getNhanThanThuyenVien,
    updateThanNhanData: updateThanNhanData
}