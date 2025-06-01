import * as db from '../models/index.js';
const dataUtils = require('./ChuanHoaServices.js');
let createNewThuyenVien = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await db.Thuyenvien.create({
                tenthuyenvien: dataUtils.chuanHoaTen(data.tenthuyenvien),
                tieuchuanapdung: data.tieuchuanapdung
            })
            resolve(result);
        } catch (e) {
            reject(e);
        }
    })

}
let getAllThuyenVien = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let thuyenviens = db.Thuyenvien.findAll({
                raw: true,
            });
            resolve(thuyenviens);
        } catch (e) {
            reject(e);
        }
    })

}
let getThuyenVienId = (thuyenvien_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let thuyenvien = await db.Thuyenvien.findOne({
                where: { id_thuyenvien: thuyenvien_id }
            })
            if (thuyenvien) {
                resolve(thuyenvien);
            } else {
                resolve([]);
            }
        } catch (e) {
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
            await db.Thuyenvien.update({
                thoigian_lenTauDuKien: null,
                },
                {
                    where: { thoigian_lenTauDuKien: '00:00:00'}
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
        try {
            let thuyenvien = await db.Thuyenvien.findOne({
                where: { id_thuyenvien: thuyenvien_id }
            })
            if (thuyenvien) {
                await thuyenvien.destroy();
            }
            resolve();
        } catch (e) {
            reject(e);
        }
    })
}

let getNhanThanThuyenVien = (thuyenvien_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let nhanthanthuyenvien = await db.Thannhan.findOne({
                where: { thuyenvien_id: thuyenvien_id }
            })
            if (nhanthanthuyenvien) {
                resolve(nhanthanthuyenvien);
            } else {
                resolve({});
            }
        } catch (e) {
            reject(e);
        }
    })
}

let updateThanNhanData = (thuyenvien_id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let existingRecord = await db.Thannhan.findOne({
                where: { thuyenvien_id: thuyenvien_id }
            });

            if (existingRecord) {
                await db.Thannhan.update(
                    data,
                    {
                        where: { thuyenvien_id: thuyenvien_id }
                    }
                );
            } else {
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
    return new Promise(async (resolve, reject) => {
        try {
            let lichsuditau = await db.Lichsuditau.findAll({
                where: { thuyenvien_id: thuyenvien_id }
            })
            if (lichsuditau) {
                resolve(lichsuditau);
            } else {
                resolve([]);
            }
        } catch (e) {
            reject(e);
        }
    })
}

let createLichSuDiTau = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const xuatCanh = new Date(data.timexuatcanh);
            const lenTau = new Date(data.timelentau);
            const roiTau = data.ngayroitau ? new Date(data.ngayroitau) : null;

            if (xuatCanh >= lenTau) {
                return reject("Thời gian xuất cảnh phải nhỏ hơn thời gian lên tàu.");
            }

            if (roiTau && lenTau >= roiTau) {
                return reject("Thời gian lên tàu phải nhỏ hơn ngày rời tàu.");
            }

            const result = await db.Lichsuditau.create({
                thuyenvien_id: data.thuyenvien_id,
                tau_id: data.tau_id,
                chucvu_id: data.chucvu_id,
                timexuatcanh: data.timexuatcanh,
                timelentau: data.timelentau,
                ngayroitau: data.ngayroitau || null,
                cangroitau: data.cangroitau || null,
                quoctich_thuyen: data.quoctich_thuyen || null,
            });

            resolve("Thêm lịch sử đi tàu thành công!");
        } catch (e) {
            console.log(e);
            reject("Có lỗi xảy ra khi thêm lịch sử đi tàu.");
        }
    });
};


let updateLichSuDiTauData = (historyId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const xuatCanh = new Date(data.timexuatcanh);
            const lenTau = new Date(data.timelentau);
            const roiTau = data.ngayroitau ? new Date(data.ngayroitau) : null;

            if (xuatCanh >= lenTau) {
                return reject("Thời gian xuất cảnh phải nhỏ hơn thời gian lên tàu.");
            }

            if (roiTau && lenTau >= roiTau) {
                return reject("Thời gian lên tàu phải nhỏ hơn ngày rời tàu.");
            }
            const updateData = {
                tau_id: data.tau_id,
                chucvu_id: data.chucvu_id,
                timexuatcanh: data.timexuatcanh,
                timelentau: data.timelentau,
                ngayroitau: data.ngayroitau || null,
                cangroitau: data.cangroitau || null,
                quoctich_thuyen: data.quoctich_thuyen || null,
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
            reject("Có lỗi xảy ra khi thêm lịch sử đi tàu.");
        }
    });
};


let deleteLichsuditau = async (id) => {
    try {
        const record = await db.Lichsuditau.findByPk(id);
        if (!record) {
            return false;
        }
        await record.destroy();
        return true;
    } catch (error) {
        throw error;
    }
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
    return new Promise(async (resolve, reject) => {
        try {
            let hocvan = await db.ThuyenvienHocvan.findOne({
                where: { id_thuyenvien: thuyenvien_id }
            });

            if (hocvan) {
                resolve(hocvan);
            } else {
                resolve(null);
            }
        } catch (e) {
            reject(e);
        }
    });
};

let createHocVan = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const existingRecord = await db.ThuyenvienHocvan.findOne({
                where: { id_thuyenvien: data.id_thuyenvien }
            });

            if (existingRecord) {
                await existingRecord.update({
                    truongdaotao: dataUtils.chuanHoaTen(data.truongdaotao),
                    hedaotao: data.hedaotao,
                    namtotnghiep: data.namtotnghiep
                });
                resolve('Cập nhật thông tin học vấn thành công!');
            } else {
                const result = await db.ThuyenvienHocvan.create({
                    id_thuyenvien: data.id_thuyenvien,
                    truongdaotao: dataUtils.chuanHoaTen(data.truongdaotao),
                    hedaotao: data.hedaotao,
                    namtotnghiep: data.namtotnghiep
                });
                resolve('Thêm thông tin học vấn thành công!');
            }
        } catch (e) {
            reject(e);
        }
    });
};

let updateHocVan = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let record = await db.ThuyenvienHocvan.findOne({ where: { id: id } });
            console.log(record);
            await db.ThuyenvienHocvan.update(
                {
                    truongdaotao: dataUtils.chuanHoaTen(data.truongdaotao),
                    hedaotao: data.hedaotao,
                    namtotnghiep: data.namtotnghiep
                },
                {
                    where: { id: id }
                }
            );
            resolve('Cập nhật thông tin học vấn thành công!');
        } catch (e) {
            reject(e);
        }
    });
};

let deleteHocVan = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.ThuyenvienHocvan.destroy({
                where: { id: id }
            });
            resolve('Xóa thông tin học vấn thành công!');
        } catch (e) {
            reject(e);
        }
    });
};

let getNgoaiNguThuyenVien = (thuyenvien_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let ngoaingu = await db.ThuyenvienNgoaingu.findAll({
                where: { id_thuyenvien: thuyenvien_id }
            });

            if (ngoaingu && ngoaingu.length > 0) {
                resolve(ngoaingu);
            } else {
                resolve([]);
            }
        } catch (e) {
            reject(e);
        }
    });
};

let createNgoaiNgu = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const ngaycap = new Date(data.ngaycap);
            const ngayhethan = new Date(data.ngayhethan);

            if (ngaycap >= ngayhethan) {
                return reject("Thời gian cấp phải nhỏ hơn thời gian hết hạn.");
            }

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
        } catch (e) {
            reject(e);
        }
    });
};

let updateNgoaiNgu = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const ngaycap = new Date(data.ngaycap);
            const ngayhethan = new Date(data.ngayhethan);

            if (ngaycap >= ngayhethan) {
                return reject("Thời gian cấp phải nhỏ hơn thời gian hết hạn.");
            }
            let updateData = {
                ngonngu: data.ngonngu,
                tenchungchi: data.tenchungchi,
                diemso: data.diemso,
                ngaycap: data.ngaycap,
                ngayhethan: data.ngayhethan
            };

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
        } catch (e) {
            reject(e);
        }
    });
};

let deleteNgoaiNgu = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.ThuyenvienNgoaingu.destroy({
                where: { id: id }
            });
            resolve('Xóa chứng chỉ ngoại ngữ thành công!');
        } catch (e) {
            reject(e);
        }
    });
};

let getNgoaiNguById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let ngoaingu = await db.ThuyenvienNgoaingu.findOne({
                where: { id: id }
            });

            if (ngoaingu) {
                resolve(ngoaingu);
            } else {
                resolve(null);
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getChungChiThuyenVien = (thuyenvien_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let chungchi = await db.ThuyenvienChungchi.findAll({
                where: { id_thuyenvien: thuyenvien_id },
                include: [
                    {
                        model: db.Chungchi,
                        as: 'chungchi',
                        attributes: ['tenchungchi']
                    }
                ],
            });

            if (chungchi && chungchi.length > 0) {
                resolve(chungchi);
            } else {
                resolve([]);
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getAllChungChi = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let chungchi = await db.Chungchi.findAll();
            resolve(chungchi);
        } catch (e) {
            reject(e);
        }
    });
};

let createChungChi = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const ngaycap = new Date(data.ngaycap);
            const ngayhethan = new Date(data.ngayhethan);

            if (ngaycap >= ngayhethan) {
                return reject("Thời gian cấp phải nhỏ hơn thời gian hết hạn.");
            }
            const result = await db.ThuyenvienChungchi.create({
                id_chungchi: data.id_chungchi,
                id_thuyenvien: data.id_thuyenvien,
                sohieuchungchi: data.sohieuchungchi,
                ngaycap: data.ngaycap,
                ngayhethan: data.ngayhethan,
                noicap: data.noicap,
                xeploai: data.xeploai,
                file: data.file
            });
            resolve('Thêm chứng chỉ thuyền viên thành công!');
        } catch (e) {
            reject(e);
        }
    });
};

let updateChungChi = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const ngaycap = new Date(data.ngaycap);
            const ngayhethan = new Date(data.ngayhethan);

            if (ngaycap >= ngayhethan) {
                return reject("Thời gian cấp phải nhỏ hơn thời gian hết hạn.");
            }
            let updateData = {
                id_chungchi: data.id_chungchi, 
                sohieuchungchi: data.sohieuchungchi,
                ngaycap: data.ngaycap,
                ngayhethan: data.ngayhethan,
                noicap: data.noicap,
                xeploai: data.xeploai
            };

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
        } catch (e) {
            reject(e);
        }
    });
};

let deleteChungChi = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.ThuyenvienChungchi.destroy({
                where: { id: id }
            });
            resolve('Xóa chứng chỉ thuyền viên thành công!');
        } catch (e) {
            reject(e);
        }
    });
};

let getChungChiById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let chungchi = await db.ThuyenvienChungchi.findOne({
                where: { id: id }
            });

            if (chungchi) {
                resolve(chungchi);
            } else {
                resolve(null);
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getTaiLieuThuyenVien = (thuyenvien_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let tailieu = await db.ThuyenvienTailieu.findOne({
                where: { id_thuyenvien: thuyenvien_id }
            });

            if (tailieu) {
                resolve(tailieu);
            } else {
                resolve(null);
            }
        } catch (e) {
            reject(e);
        }
    });
};

let createOrUpdateTaiLieu = (thuyenvien_id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const existingRecord = await db.ThuyenvienTailieu.findOne({
                where: { id_thuyenvien: thuyenvien_id }
            });

            if (existingRecord) {
                await existingRecord.update(data);
                resolve('Cập nhật tài liệu thành công!');
            } else {
                data.id_thuyenvien = thuyenvien_id;
                await db.ThuyenvienTailieu.create(data);
                resolve('Thêm tài liệu thành công!');
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getTaiLieuById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let tailieu = await db.ThuyenvienTailieu.findByPk(id);

            if (tailieu) {
                resolve(tailieu);
            } else {
                resolve(null);
            }
        } catch (e) {
            reject(e);
        }
    });
};

let deleteTaiLieu = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.ThuyenvienTailieu.destroy({
                where: { id: id }
            });
            resolve('Xóa tài liệu thành công!');
        } catch (e) {
            reject(e);
        }
    });
};

let getExpiringCertificates = (days = 30) => {
    return new Promise(async (resolve, reject) => {
        try {
            const today = new Date();
            const limitDate = new Date();
            limitDate.setDate(limitDate.getDate() + days);  
            let certificates = await db.ThuyenvienChungchi.findAll({
                where: {
                    ngayhethan: {
                        [db.Sequelize.Op.gt]: today,      
                        [db.Sequelize.Op.lte]: limitDate 
                    }
                },
                include: [
                    {
                        model: db.Thuyenvien,
                        as: 'thuyenvien',
                        attributes: ['id_thuyenvien', 'hoten']
                    },
                    {
                        model: db.Chungchi,
                        as: 'chungchi',
                        attributes: ['tenchungchi']
                    }
                ],
                order: [['ngayhethan', 'ASC']]
            });

            resolve(certificates);
        } catch (e) {
            reject(e);
        }
    });
};


let getExpiredCertificates = (certificateType = null) => {
    return new Promise(async (resolve, reject) => {
        try {
            const today = new Date();

            let whereClause = {
                ngayhethan: {
                    [db.Sequelize.Op.lt]: today
                }
            };

            if (certificateType) {
                whereClause.id_chungchi = certificateType;
            }

            let certificates = await db.ThuyenvienChungchi.findAll({
                where: whereClause,
                include: [
                    {
                        model: db.Thuyenvien,
                        as: 'thuyenvien',
                        attributes: ['id_thuyenvien', 'hoten']
                    },
                    {
                        model: db.Chungchi,
                        as: 'chungchi',
                        attributes: ['tenchungchi']
                    }

                ],
                order: [['ngayhethan', 'ASC']]
            });

            resolve(certificates);
        } catch (e) {
            reject(e);
        }
    });
};

let createNewThuyenVienFull = async (crewData, familyData, educationData, languageCertificates, crewCertificates, documentData, bankAccountData) => {
    let transaction;

    try {
        transaction = await db.sequelize.transaction();

        const newCrewMember = await db.Thuyenvien.create(crewData, { transaction });
        const thuyenvien_id = newCrewMember.id_thuyenvien;

        if (Object.values(familyData).some(val => val)) {
            familyData.thuyenvien_id = thuyenvien_id;
            await db.Thannhan.create(familyData, { transaction });
        }

        if (educationData.truongdaotao) {
            educationData.id_thuyenvien = thuyenvien_id;
            await db.ThuyenvienHocvan.create(educationData, { transaction });
        }

        if (languageCertificates && languageCertificates.length > 0) {
            for (const certData of languageCertificates) {
                if (!certData.ngonngu && !certData.tenchungchi) continue;

                certData.id_thuyenvien = thuyenvien_id;
                await db.ThuyenvienNgoaingu.create(certData, { transaction });
            }
        }

        if (crewCertificates && crewCertificates.length > 0) {
            for (const certData of crewCertificates) {
                if (!certData.id_chungchi) continue;

                certData.id_thuyenvien = thuyenvien_id;
                await db.ThuyenvienChungchi.create(certData, { transaction });
            }
        }

        if (Object.keys(documentData).length > 0) {
            documentData.id_thuyenvien = thuyenvien_id;
            await db.ThuyenvienTailieu.create(documentData, { transaction });
        }

        if (bankAccountData && bankAccountData.stk) {
            bankAccountData.thuyenvien_id = thuyenvien_id;
            await db.Taikhoannganhang.create(bankAccountData, { transaction });
        }

        await transaction.commit();

        return {
            success: true,
            message: 'Thêm thuyền viên thành công',
            thuyenvienId: thuyenvien_id
        };
    } catch (error) {
        if (transaction) await transaction.rollback();
        console.error('Lỗi khi thêm thuyền viên:', error);
        throw error;
    }
};

let updateThuyenVienStatus = (id, newStatus) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Thuyenvien.update(
                { trangthai: newStatus },
                { where: { id_thuyenvien: id } }
            );
            resolve('Cập nhật trạng thái thành công!');
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
}

let getCrewWithCertificates = (certificateIds) => {
    return new Promise(async (resolve, reject) => {
        try {
            const certificates = await db.ThuyenvienChungchi.findAll({
                attributes: [
                    'id_thuyenvien',
                    [db.sequelize.fn('COUNT', db.sequelize.fn('DISTINCT', db.sequelize.col('id_chungchi'))), 'certificateCount']
                ],
                where: {
                    id_chungchi: {
                        [db.Sequelize.Op.in]: certificateIds
                    }
                },
                group: ['id_thuyenvien'],
                having: db.sequelize.literal(`COUNT(DISTINCT id_chungchi) = ${certificateIds.length}`),
                raw: true
            });

            const crewIds = [...new Set(certificates.map(cert => cert.id_thuyenvien))];
            resolve(crewIds);
        } catch (e) {
            reject(e);
        }
    });
};

let getEstimatedBoardingTimes = (crewIds) => {
    return new Promise(async (resolve, reject) => {
        try {
            let boardingTimes = {};

            if (!crewIds || crewIds.length === 0) {
                resolve(boardingTimes);
                return;
            }
            const crewMembers = await db.Thuyenvien.findAll({
                attributes: ['id_thuyenvien', 'thoigian_lenTauDuKien'],
                where: {
                    id_thuyenvien: {
                        [db.Sequelize.Op.in]: crewIds
                    },
                    thoigian_lenTauDuKien: {
                        [db.Sequelize.Op.not]: null
                    }
                },
                raw: true
            });

            crewMembers.forEach(record => {
                if (record.thoigian_lenTauDuKien) {
                    const date = new Date(record.thoigian_lenTauDuKien);
                    if (!isNaN(date.getTime())) {
                        const year = date.getFullYear();
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const day = String(date.getDate()).padStart(2, '0');
                        const hours = String(date.getHours()).padStart(2, '0');
                        const minutes = String(date.getMinutes()).padStart(2, '0');

                        boardingTimes[record.id_thuyenvien] = `${year}-${month}-${day} ${hours}:${minutes}`;
                    } else {
                        boardingTimes[record.id_thuyenvien] = 'Invalid date';
                    }
                }
            });

            resolve(boardingTimes);
        } catch (e) {
            reject(e);
        }
    });
};

async function getThuyenvienById(id) {
    try {
        const thuyenvien = await db.Thuyenvien.findOne({
            where: { id_thuyenvien: id },
            include: [
                { model: db.ThuyenvienHocvan, as: 'hocvan' },
                { model: db.ThuyenvienNgoaingu, as: 'ngoaingu' },
                { model: db.ThuyenvienChungchi, as: 'chungchi' },
                { model: db.ThuyenvienTailieu, as: 'tailieu' },
                { model: db.Hopdong, as: 'hopdongs' }
            ]
        });
        return thuyenvien;
    } catch (error) {
        console.error('Lỗi khi lấy thuyền viên:', error);
        throw error;
    }
}

const ThuyenVienServices = {
    createNewThuyenVien: createNewThuyenVien,
    getAllThuyenVien: getAllThuyenVien,
    getThuyenVienId: getThuyenVienId,
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
    getChungChiById: getChungChiById,
    getTaiLieuThuyenVien: getTaiLieuThuyenVien,
    createOrUpdateTaiLieu: createOrUpdateTaiLieu,
    getTaiLieuById: getTaiLieuById,
    deleteTaiLieu: deleteTaiLieu,
    getExpiringCertificates: getExpiringCertificates,
    getExpiredCertificates: getExpiredCertificates,
    createNewThuyenVienFull: createNewThuyenVienFull,
    updateThuyenVienStatus: updateThuyenVienStatus,
    getThuyenvienById: getThuyenvienById,
    getCrewWithCertificates: getCrewWithCertificates,
    getEstimatedBoardingTimes: getEstimatedBoardingTimes,
    deleteLichsuditau : deleteLichsuditau,
};
export default ThuyenVienServices;