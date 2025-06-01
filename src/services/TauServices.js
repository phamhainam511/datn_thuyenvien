import db from '../models/index.js';
import { Sequelize, Op } from 'sequelize';
import dataUtils from './ChuanHoaServices.js';

let createNewTau = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await db.Tau.create({
                tentau: dataUtils.chuanHoaTen(data.tentau),
                quoctich: dataUtils.chuanHoaTen(data.quoctich),
                loaitau_id: data.loaitau_id
            })
            resolve(result);
        } catch (e) {
            reject(e);
        }
    })

}

let getComboLoaiTau = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let comboLoaitau = await db.Loaitau.findAll({
                attributes: ['id_loaitau', 'tenloaitau'],
                order: [['tenloaitau', 'ASC']]
            })
            resolve(comboLoaitau);
        } catch (e) {
            reject(e);
        }
    });
};

let getAllTau = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let taus = await db.Tau.findAll({
                attributes: ['id_tau', 'tentau', 'quoctich', 'loaitau_id'],
                include: [
                    {
                        model: db.Loaitau,
                        as: 'loaitau',
                        attributes: ['tenloaitau']
                    }
                ]
            });
            resolve(taus);
        } catch (e) {
            reject(e);
        }
    });
};

let getTauId = (tau_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let tau = await db.Tau.findOne({
                where: { id: tau_id }
            })
            if (tau) {
                resolve(tau);
            } else {
                resolve([]);
            }
        } catch (e) {
            reject(e);
        }
    })
}

let updateTauData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Tau.update(
                {
                    tentau: dataUtils.chuanHoaTen(data.tentau),
                    quoctich: dataUtils.chuanHoaTen(data.quoctich),
                    loaitau_id: data.loaitau_id
                },
                {
                    where: { id_tau: data.id_tau }
                }
            );
            resolve('Cập nhật thành công!');
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
}
let deleteTau = (tau_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let tau = await db.Tau.findOne({
                where: { id_tau: tau_id }
            })
            if (tau) {
                await tau.destroy();
            }
            resolve();
        } catch (e) {
            reject(e);
        }
    })
}

let searchTau = async (keyword = '') => {
    return new Promise(async (resolve, reject) => {
        try {
            const taus = await db.Tau.findAll({
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


const TauServices = {
    createNewTau: createNewTau,
    getComboLoaiTau: getComboLoaiTau,
    getAllTau: getAllTau,
    getTauId: getTauId,
    updateTauData: updateTauData,
    deleteTau: deleteTau,
    searchTau: searchTau
};
export default TauServices;
