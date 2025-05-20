const db = require('../models');
const DashBoardServices = require("../services/DashBoardServices");

const getExpiringCertificateCount = async (days = 30) => {
    return await DashBoardServices.getExpiringCertificateCount(days);
};

const getPendingContractsCount = async () => {
    return await DashBoardServices.getPendingContractsCount();
};

const getThuyenvienDangTrenTau = async () => {
    return await DashBoardServices.countThuyenvienDangTrenTau();
}

const getThuyenvienDangChoTau = async () => {
    return await DashBoardServices.countThuyenvienDangChoTau();
}

const getChucVuStats = async () => {
    return await DashBoardServices.getChucVuStats();
};

const getThuyenvienTrangThaiStats = async () => {
    return await DashBoardServices.getThuyenvienTrangThaiStats();
};

module.exports = {
    getExpiringCertificateCount,
    getPendingContractsCount,
    getThuyenvienDangTrenTau,
    getThuyenvienDangChoTau,
    getChucVuStats,
    getThuyenvienTrangThaiStats
};
