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

let createLichSuDiTau = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hour = parseInt(data.timelentau.split(':')[0]) + 7;
            if (hour >= 24) {
                hour -= 24;
            }
            let minute = data.timelentau.split(':')[1];
            // Create new lichsuditau record
            const result = await db.Lichsuditau.create({
                thuyenvien_id: data.thuyenvien_id,
                tau_id: data.tau_id,
                chucvu_id: data.chucvu_id,
                timexuatcanh: data.timexuatcanh,
                timelentau: `2025-01-01 ${hour}:${minute}:00`,
                ngayroitau: data.ngayroitau || null,
                cangroitau: data.cangroitau || null
            });
            
            resolve('Thêm lịch sử đi tàu thành công!');
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};

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

let getHocVanThuyenVien = (thuyenvien_id) => {
    return new Promise(async(resolve, reject) => {
        try {
            // Change to findOne instead of findAll
            let hocvan = await db.ThuyenvienHocvan.findOne({
                where: { id_thuyenvien: thuyenvien_id }
            });
            
            if (hocvan) {
                resolve(hocvan);
            } else {
                resolve(null);
            }
        } catch(e) {
            reject(e);
        }
    });
};

let createHocVan = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            // Check if a record already exists
            const existingRecord = await db.ThuyenvienHocvan.findOne({
                where: { id_thuyenvien: data.id_thuyenvien }
            });
            
            if (existingRecord) {
                // Update existing record
                await existingRecord.update({
                    truongdaotao: data.truongdaotao,
                    hedaotao: data.hedaotao,
                    namtotnghiep: data.namtotnghiep
                });
                resolve('Cập nhật thông tin học vấn thành công!');
            } else {
                // Create new record
                const result = await db.ThuyenvienHocvan.create({
                    id_thuyenvien: data.id_thuyenvien,
                    truongdaotao: data.truongdaotao,
                    hedaotao: data.hedaotao,
                    namtotnghiep: data.namtotnghiep
                });
                resolve('Thêm thông tin học vấn thành công!');
            }
        } catch(e) {
            reject(e);
        }
    });
};

let updateHocVan = (id, data) => {
    return new Promise(async(resolve, reject) => {
        try {
            await db.ThuyenvienHocvan.update(
                {
                    truongdaotao: data.truongdaotao,
                    hedaotao: data.hedaotao,
                    namtotnghiep: data.namtotnghiep
                },
                {
                    where: { id: id }
                }
            );
            resolve('Cập nhật thông tin học vấn thành công!');
        } catch(e) {
            reject(e);
        }
    });
};

let deleteHocVan = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            await db.ThuyenvienHocvan.destroy({
                where: { id: id }
            });
            resolve('Xóa thông tin học vấn thành công!');
        } catch(e) {
            reject(e);
        }
    });
};

let getNgoaiNguThuyenVien = (thuyenvien_id) => {
    return new Promise(async(resolve, reject) => {
        try {
            let ngoaingu = await db.ThuyenvienNgoaingu.findAll({
                where: { id_thuyenvien: thuyenvien_id }
            });
            
            if (ngoaingu && ngoaingu.length > 0) {
                resolve(ngoaingu);
            } else {
                resolve([]);
            }
        } catch(e) {
            reject(e);
        }
    });
};

let createNgoaiNgu = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            const result = await db.ThuyenvienNgoaingu.create({
                id_thuyenvien: data.id_thuyenvien,
                ngonngu: data.ngonngu,
                tenchungchi: data.tenchungchi,
                diemso: data.diemso,
                ngaycap: data.ngaycap,
                ngayhethan: data.ngayhethan,
                file: data.file
            });
            resolve('Thêm chứng chỉ ngoại ngữ thành công!');
        } catch(e) {
            reject(e);
        }
    });
};

let updateNgoaiNgu = (id, data) => {
    return new Promise(async(resolve, reject) => {
        try {
            let updateData = {
                ngonngu: data.ngonngu,
                tenchungchi: data.tenchungchi,
                diemso: data.diemso,
                ngaycap: data.ngaycap,
                ngayhethan: data.ngayhethan
            };
            
            // Only update file if a new one is provided
            if (data.file) {
                updateData.file = data.file;
            }
            
            await db.ThuyenvienNgoaingu.update(
                updateData,
                {
                    where: { id: id }
                }
            );
            resolve('Cập nhật chứng chỉ ngoại ngữ thành công!');
        } catch(e) {
            reject(e);
        }
    });
};

let deleteNgoaiNgu = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            await db.ThuyenvienNgoaingu.destroy({
                where: { id: id }
            });
            resolve('Xóa chứng chỉ ngoại ngữ thành công!');
        } catch(e) {
            reject(e);
        }
    });
};

let getNgoaiNguById = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            let ngoaingu = await db.ThuyenvienNgoaingu.findOne({
                where: { id: id }
            });
            
            if (ngoaingu) {
                resolve(ngoaingu);
            } else {
                resolve(null);
            }
        } catch(e) {
            reject(e);
        }
    });
};

let getChungChiThuyenVien = (thuyenvien_id) => {
    return new Promise(async(resolve, reject) => {
        try {
            let chungchi = await db.ThuyenvienChungchi.findAll({
                where: { id_thuyenvien: thuyenvien_id }
                // Removed include since we no longer need to join with Chungchi table
            });
            
            if (chungchi && chungchi.length > 0) {
                resolve(chungchi);
            } else {
                resolve([]);
            }
        } catch(e) {
            reject(e);
        }
    });
};

let getAllChungChi = () => {
    return new Promise(async(resolve, reject) => {
        try {
            let chungchi = await db.Chungchi.findAll();
            resolve(chungchi);
        } catch(e) {
            reject(e);
        }
    });
};

let createChungChi = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            const result = await db.ThuyenvienChungchi.create({
                id_thuyenvien: data.id_thuyenvien,
                tenchungchi: data.tenchungchi, // Changed from chungchi_id
                sohieuchungchi: data.sohieuchungchi,
                ngaycap: data.ngaycap,
                ngayhethan: data.ngayhethan,
                noicap: data.noicap,
                xeploai: data.xeploai,
                file: data.file
            });
            resolve('Thêm chứng chỉ thuyền viên thành công!');
        } catch(e) {
            reject(e);
        }
    });
};

let updateChungChi = (id, data) => {
    return new Promise(async(resolve, reject) => {
        try {
            let updateData = {
                tenchungchi: data.tenchungchi, // Changed from chungchi_id
                sohieuchungchi: data.sohieuchungchi,
                ngaycap: data.ngaycap,
                ngayhethan: data.ngayhethan,
                noicap: data.noicap,
                xeploai: data.xeploai
            };
            
            // Only update file if a new one is provided
            if (data.file) {
                updateData.file = data.file;
            }
            
            await db.ThuyenvienChungchi.update(
                updateData,
                {
                    where: { id: id }
                }
            );
            resolve('Cập nhật chứng chỉ thuyền viên thành công!');
        } catch(e) {
            reject(e);
        }
    });
};

let deleteChungChi = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            await db.ThuyenvienChungchi.destroy({
                where: { id: id }
            });
            resolve('Xóa chứng chỉ thuyền viên thành công!');
        } catch(e) {
            reject(e);
        }
    });
};

let getChungChiById = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            let chungchi = await db.ThuyenvienChungchi.findOne({
                where: { id: id }
            });
            
            if (chungchi) {
                resolve(chungchi);
            } else {
                resolve(null);
            }
        } catch(e) {
            reject(e);
        }
    });
};

module.exports = {
    createNewThuyenVien: createNewThuyenVien,
    getAllThuyenVien : getAllThuyenVien,
    getThuyenVienId : getThuyenVienId,
    updateThuyenVienData: updateThuyenVienData,
    deleteThuyenVien: deleteThuyenVien,
    getNhanThanThuyenVien: getNhanThanThuyenVien,
    updateThanNhanData: updateThanNhanData,
    getLichSuDiTau: getLichSuDiTau,
    createLichSuDiTau: createLichSuDiTau,
    updateLichSuDiTauData: updateLichSuDiTauData,
    getAllTau: getAllTau,
    getAllChucVu: getAllChucVu,
    getHocVanThuyenVien: getHocVanThuyenVien,
    createHocVan: createHocVan,
    updateHocVan: updateHocVan,
    deleteHocVan: deleteHocVan,
    getNgoaiNguThuyenVien: getNgoaiNguThuyenVien,
    createNgoaiNgu: createNgoaiNgu,
    updateNgoaiNgu: updateNgoaiNgu,
    deleteNgoaiNgu: deleteNgoaiNgu,
    getNgoaiNguById: getNgoaiNguById,
    getChungChiThuyenVien: getChungChiThuyenVien,
    getAllChungChi: getAllChungChi,
    createChungChi: createChungChi,
    updateChungChi: updateChungChi,
    deleteChungChi: deleteChungChi,
    getChungChiById: getChungChiById
}