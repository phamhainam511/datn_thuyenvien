const db = require('../models');
const DashBoardServices = require("../services/DashBoardServices");

const getExpiringCertificateCount = async (days = 30) => {
    return await DashBoardServices.getExpiringCertificateCount(days);
};

const getPendingContractsCount = async () => {
    return await DashBoardServices.getPendingContractsCount();
};

module.exports = {
    getExpiringCertificateCount,
    getPendingContractsCount
};
