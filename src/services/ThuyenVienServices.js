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

let getLichSuDiTau = (thuyenvien_id) => {
    return new Promise (async(resolve, reject) => {
        try {
            let lichsuditau = await db.Lichsuditau.findAll({
                where : {thuyenvien_id : thuyenvien_id}
            })
            if (lichsuditau){
                resolve (lichsuditau);
            }else {
                resolve ([]);
            }
        }catch(e){
            reject(e);
        }
    })
}

let updateLichSuDiTauData = (historyId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Create update object with IDs directly from form
            let hour = parseInt(data.timelentau.split(':')[0]) + 7;
            if (hour >= 24) {
                hour -= 24;
            }
            let minute = data.timelentau.split(':')[1];
            const updateData = {
                tau_id: data.tau_id,
                chucvu_id: data.chucvu_id,
                timexuatcanh: data.timexuatcanh,
                timelentau: `2025-01-01 ${hour}:${minute}:00`,
                ngayroitau: data.ngayroitau,
                cangroitau: data.cangroitau
            };
            
            await db.Lichsuditau.update(
                updateData,
                {
                    where: { id_lichsuditau: historyId }
                }
            );
            
            resolve('Cập nhật lịch sử đi tàu thành công!');
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};

let getAllTau = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let tau = await db.Tau.findAll();
            resolve(tau);
        } catch (e) {
            reject(e);
        }
    });
}

let getAllChucVu = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let vitri = await db.Chucvu.findAll();
            resolve(vitri);
        } catch (e) {
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
    updateThanNhanData: updateThanNhanData,
    getLichSuDiTau: getLichSuDiTau,
    updateLichSuDiTauData: updateLichSuDiTauData,
    getAllTau: getAllTau,
    getAllChucVu: getAllChucVu
}